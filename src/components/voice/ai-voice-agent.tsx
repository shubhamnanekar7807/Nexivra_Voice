"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

type Language = "en" | "hi" | "mr";

interface Message {
  id: string;
  sender: "agent" | "user";
  text: string;
  timestamp: string;
}

interface Persona {
  id: string;
  name: string;
  role: string;
  avatar: string;
  welcome: string;
  lang: Language;
  langLabel: string;
  voicePitch: number;
  voiceRate: number;
}

const PERSONAS: Persona[] = [
  // English Personas
  {
    id: "sarah",
    name: "Sarah",
    role: "Front Desk & Booking Concierge",
    avatar: "S",
    welcome: "Hello! I am Sarah, your AI voice concierge. How can I help you today? You can speak in English, Hindi, or Marathi!",
    lang: "en",
    langLabel: "English",
    voicePitch: 1.05,
    voiceRate: 1.0,
  },
  {
    id: "alex",
    name: "Alex",
    role: "Enterprise Solutions & Sales",
    avatar: "A",
    welcome: "Hi there! I am Alex from Nexivra Tech. I can show you how our sub-second voice agents, web applications, and motion design transform businesses.",
    lang: "en",
    langLabel: "English",
    voicePitch: 0.95,
    voiceRate: 1.02,
  },

  // Hindi (हिन्दी) Personas
  {
    id: "riya",
    name: "रिया (Riya)",
    role: "कस्टमर सपोर्ट व बुकिंग एक्सपर्ट",
    avatar: "R",
    welcome: "नमस्ते! मैं रिया हूँ, नेक्सिव्रा टेक से आपकी एआई वॉयस असिस्टेंट। मैं आपकी क्या मदद कर सकती हूँ? आप मुझसे बोलकर बात कर सकते हैं!",
    lang: "hi",
    langLabel: "हिन्दी",
    voicePitch: 1.1,
    voiceRate: 0.95,
  },
  {
    id: "aryan",
    name: "आर्यन (Aryan)",
    role: "टेक्नोलॉजी व सेल्स कंसल्टेंट",
    avatar: "A",
    welcome: "नमस्कार! मैं आर्यन हूँ। हमारे एआई वॉयस एजेंट्स, मॉडर्न वेबसाइट्स और मोशन एनिमेशन सॉल्यूशंस के बारे में आप कुछ भी पूछ सकते हैं।",
    lang: "hi",
    langLabel: "हिन्दी",
    voicePitch: 0.95,
    voiceRate: 0.98,
  },

  // Marathi (मराठी) Personas
  {
    id: "sneha",
    name: "स्नेहा (Sneha)",
    role: "ग्राहक सेवा व अपॉइंटमेंट असिस्टंट",
    avatar: "S",
    welcome: "नमस्कार! मी स्नेहा आहे, नेक्सिव्रा टेकची तुमची एआय व्हॉईस असिस्टंट. मी तुम्हाला कशी मदत करू शकते? तुम्ही माझ्याशी थेट मराठीत बोलू शकता!",
    lang: "mr",
    langLabel: "मराठी",
    voicePitch: 1.08,
    voiceRate: 0.95,
  },
  {
    id: "rohan",
    name: "रोहन (Rohan)",
    role: "बिझनेस व सोल्युशन्स एक्सपर्ट",
    avatar: "R",
    welcome: "नमस्कार! मी रोहन. आमचे एआय व्हॉईस एजंट्स, आधुनिक वेब अ‍ॅप्स आणि मोशन अ‍ॅनिमेशन तुमच्या बिझनेसचे कॉल्स 24 तास कसे स्वयंचलित करतात ते मी सांगतो.",
    lang: "mr",
    langLabel: "मराठी",
    voicePitch: 0.96,
    voiceRate: 0.98,
  },
];

const PROMPTS_BY_LANG: Record<Language, string[]> = {
  en: [
    "What services does Nexivra provide?",
    "Can I schedule an appointment?",
    "Tell me about Website & Motion design",
    "How fast is your voice latency?",
    "How do I contact your team?",
  ],
  hi: [
    "आपकी मुख्य सेवाएं क्या हैं?",
    "क्या मैं एक अपॉइंटमेंट बुक कर सकता हूँ?",
    "वेबसाइट और मोशन एनिमेशन के बारे में बताएं",
    "वॉयस एजेंट की स्पीड और लेटेंसी क्या है?",
    "आपकी टीम से कैसे संपर्क करें?",
  ],
  mr: [
    "तुम्ही कोणत्या सेवा प्रदान करता?",
    "मला नवीन अपॉइंटमेंट बुक करायची आहे",
    "वेबसाईट आणि मोशन डिझाईन बद्दल सांगा",
    "व्हॉईस एजंटचा रिस्पॉन्स टाईम किती आहे?",
    "नेक्सिव्रा टेकशी कसा संपर्क साधायचा?",
  ],
};

export function AiVoiceAgent({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  const [selectedLang, setSelectedLang] = useState<Language>("en");
  const [selectedPersona, setSelectedPersona] = useState<Persona>(PERSONAS[0]);
  const [isCallActive, setIsCallActive] = useState<boolean>(false);
  const [agentState, setAgentState] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [transcript, setTranscript] = useState<string>("");
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [supportedRecognition, setSupportedRecognition] = useState<boolean>(false);

  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioIntervalRef = useRef<any>(null);

  // Filter personas matching current language
  const currentLangPersonas = PERSONAS.filter((p) => p.lang === selectedLang);

  // Auto-scroll transcript feed
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, transcript]);

  // Check speech recognition support
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSupportedRecognition(true);
      }
    }
  }, []);

  // When language changes, update persona and greeting
  const handleLanguageChange = (lang: Language) => {
    setSelectedLang(lang);
    const newPersona = PERSONAS.find((p) => p.lang === lang) || PERSONAS[0];
    setSelectedPersona(newPersona);

    if (isCallActive) {
      const greetingMsg: Message = {
        id: Math.random().toString(36).substring(7),
        sender: "agent",
        text: newPersona.welcome,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, greetingMsg]);
      speakText(newPersona.welcome, lang, newPersona);
    }
  };

  // Multilingual Speech Synthesis Engine
  const speakText = useCallback(
    (text: string, lang: Language = selectedLang, persona: Persona = selectedPersona) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        setAgentState("idle");
        return;
      }

      window.speechSynthesis.cancel();
      setAgentState("speaking");

      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      audioIntervalRef.current = setInterval(() => {
        setAudioLevel(Math.floor(Math.random() * 85) + 15);
      }, 100);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = persona.voiceRate;
      utterance.pitch = persona.voicePitch;

      if (lang === "hi") {
        utterance.lang = "hi-IN";
      } else if (lang === "mr") {
        utterance.lang = "mr-IN";
      } else {
        utterance.lang = "en-IN";
      }

      const voices = window.speechSynthesis.getVoices();
      let matchedVoice = null;

      if (lang === "hi") {
        matchedVoice = voices.find((v) => v.lang.startsWith("hi") || v.name.includes("Hindi") || v.name.includes("Lekha") || v.name.includes("India"));
      } else if (lang === "mr") {
        matchedVoice = voices.find((v) => v.lang.startsWith("mr") || v.name.includes("Marathi") || v.lang.startsWith("hi") || v.name.includes("India"));
      } else {
        matchedVoice = voices.find(
          (v) =>
            v.lang.startsWith("en") &&
            (v.name.includes("Natural") ||
              v.name.includes("Google") ||
              v.name.includes("Samantha") ||
              v.name.includes("Karen") ||
              v.name.includes("India") ||
              v.name.includes("Daniel"))
        );
      }

      if (matchedVoice) utterance.voice = matchedVoice;

      utterance.onend = () => {
        clearInterval(audioIntervalRef.current);
        setAudioLevel(0);
        setAgentState("idle");
      };

      utterance.onerror = () => {
        clearInterval(audioIntervalRef.current);
        setAudioLevel(0);
        setAgentState("idle");
      };

      window.speechSynthesis.speak(utterance);
    },
    [selectedLang, selectedPersona]
  );

  // Dynamic Contextual Knowledge Generator for English, Hindi, and Marathi
  const generateAgentResponse = useCallback(
    (query: string, lang: Language): string => {
      const q = query.toLowerCase();

      // MARATHI (मराठी) RESPONSES
      if (lang === "mr") {
        if (q.includes("सेवा") || q.includes("काम") || q.includes("सर्व्हिस") || q.includes("service")) {
          return "नेक्सिव्रा टेक प्रामुख्याने ३ मुख्य सेवा प्रदान करते: १) २४/७ मानवासारखे बोलणारे एआय व्हॉईस एजंट्स, २) आधुनिक आणि वेगवान वेब अ‍ॅप्स, आणि ३) आकर्षक मोशन ग्राफिक्स व अ‍ॅनिमेशन डिझाईन!";
        }
        if (q.includes("अपॉइंटमेंट") || q.includes("बुक") || q.includes("appointment") || q.includes("schedule")) {
          return "नक्कीच! मी तुमची अपॉइंटमेंट त्वरित बुक करू शकते. या गुरुवारी दुपारी २:०० वाजता किंवा शुक्रवारी सकाळी ११:०० वाजता कोणती वेळ तुम्हाला सोयीची आहे?";
        }
        if (q.includes("मोशन") || q.includes("वेबसाईट") || q.includes("अ‍ॅनिमेशन") || q.includes("website")) {
          return "आम्ही नेक्स्ट.जेएस आणि रिअ‍ॅक्ट वापरून हाय-स्पीड वेब अ‍ॅप्स आणि सुंदर मोशन अ‍ॅनिमेशन्स तयार करतो, ज्यामुळे तुमच्या ग्राहकांना सर्वोत्तम अनुभव मिळतो!";
        }
        if (q.includes("स्पीड") || q.includes("लेटन्सी") || q.includes("फास्ट") || q.includes("latency")) {
          return "आमचे व्हॉईस एजंट्स ५०० मिलीसेकंदांपेक्षा कमी वेळेत उत्तर देतात! संभाषण अत्यंत नैसर्गिक आणि विनाअडथळा होते.";
        }
        if (q.includes("संपर्क") || q.includes("ईमेल") || q.includes("contact") || q.includes("फोन")) {
          return "तुम्ही आमच्या टीमशी थेट hello@nexivratech.in वर ईमेल करू शकता किंवा आमच्या Contact पेजवरून प्रोजेक्ट रिक्वेस्ट पाठवू शकता. आम्ही २ तासांत उत्तर देतो!";
        }
        if (q.includes("नमस्कार") || q.includes("हॅलो") || q.includes("हाय") || q.includes("hello")) {
          return "नमस्कार! मी " + selectedPersona.name + " आहे. नेक्सिव्रा टेकमध्ये आपले स्वागत आहे. मी आपल्याला कशी मदत करू?";
        }
        return "धन्यवाद! आपण विचारलेल्या \"" + query + "\" बद्दल: नेक्सिव्रा टेक एआय व्हॉईस सोल्यूशन्स, वेब डेव्हलपमेंट आणि मोशन डिझाईनमध्ये तज्ञ आहे. आपण अधिक माहितीसाठी आम्हाला कधीही संपर्क करू शकता!";
      }

      // HINDI (हिन्दी) RESPONSES
      if (lang === "hi") {
        if (q.includes("सेवा") || q.includes("काम") || q.includes("सर्विस") || q.includes("service")) {
          return "नेक्सिव्रा टेक मुख्य रूप से ३ सेवाएं प्रदान करता है: १) २४ घंटे चलने वाले एआई वॉयस एजेंट्स, २) आधुनिक नेक्स्ट.जेएस वेब एप्लीकेशन्स, और ३) इंटरैक्टिव मोशन व 3D एनिमेशन डिज़ाइन!";
        }
        if (q.includes("अपॉइंटमेंट") || q.includes("बुक") || q.includes("मीटिंग") || q.includes("appointment")) {
          return "जी बिल्कुल! मैं आपकी अपॉइंटमेंट अभी शेड्यूल कर सकती हूँ। इस गुरुवार दोपहर २:०० बजे या शुक्रवार सुबह ११:०० बजे में से कौन सा समय आपके लिए सही रहेगा?";
        }
        if (q.includes("वेबसाइट") || q.includes("एनिमेशन") || q.includes("मोशन") || q.includes("website")) {
          return "हम आधुनिक नेक्स्ट.जेएस और रिऐक्ट पर आधारित अल्ट्रा-फास्ट वेबसाइट्स और आकर्षक मोशन एनिमेशन बनाते हैं जो आपके बिजनेस के कनवर्जन को बढ़ाते हैं।";
        }
        if (q.includes("स्पीड") || q.includes("लेटेंसी") || q.includes("फास्ट") || q.includes("latency")) {
          return "हमारे वॉयस एजेंट्स ५०० मिलीसेकंड से भी कम समय में रिस्पॉन्स देते हैं। बातचीत बिल्कुल सहज और प्राकृतिक होती है।";
        }
        if (q.includes("संपर्क") || q.includes("ईमेल") || q.includes("contact") || q.includes("फोन")) {
          return "आप हमारी टीम से सीधे hello@nexivratech.in पर संपर्क कर सकते हैं या हमारे Contact पेज से प्रोजेक्ट रिक्वेस्ट भेज सकते हैं। हम २ घंटे में जवाब देते हैं!";
        }
        if (q.includes("नमस्ते") || q.includes("नमस्कार") || q.includes("हेलो") || q.includes("हाय")) {
          return "नमस्ते! मैं " + selectedPersona.name + " हूँ। नेक्सिव्रा टेक में आपका स्वागत है। मैं आपकी क्या मदद कर सकती हूँ?";
        }
        return "धन्यवाद! \"" + query + "\" के बारे में: नेक्सिव्रा टेक आपके बिजनेस को वॉइस एआई, मॉडर्न वेब डेवलपमेंट और मोशन एनिमेशन के जरिए आगे बढ़ाता है।";
      }

      // ENGLISH RESPONSES
      if (q.includes("schedule") || q.includes("appointment") || q.includes("book")) {
        return "I would be delighted to schedule that for you! I have openings this Thursday at 2:00 PM or Friday at 10:30 AM. Which one works best for your calendar?";
      }
      if (q.includes("service") || q.includes("what do you do") || q.includes("nexivra")) {
        return "Nexivra Tech delivers 3 core pillars: 1) Sub-500ms AI Voice Agents & Telephony, 2) High-speed Next.js Web Applications, and 3) Custom Motion Graphics & Interactive Animation!";
      }
      if (q.includes("motion") || q.includes("animation") || q.includes("website") || q.includes("web")) {
        return "We design cutting-edge web applications and interactive motion graphics with smooth scroll storytelling and high-converting UI that captivate your customers.";
      }
      if (q.includes("latency") || q.includes("fast") || q.includes("speed")) {
        return "Our voice agents operate with sub-500 millisecond response latency with dynamic interruption handling for fluid, natural dialogue in English, Hindi, and Marathi!";
      }
      if (q.includes("contact") || q.includes("email") || q.includes("reach")) {
        return "You can reach our engineering team directly at hello@nexivratech.in or submit a quote request on our Contact page. We guarantee a response within 2 hours!";
      }
      if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
        return "Hello! It is wonderful to meet you. I am " + selectedPersona.name + ". How can I assist your business today?";
      }

      return "Thank you for asking about \"" + query + "\". As " + selectedPersona.name + ", I can configure custom business knowledge, automate client calls, and handle workflows 24/7 in English, Hindi, and Marathi.";
    },
    [selectedPersona]
  );

  const handleUserMessage = useCallback(
    (userText: string) => {
      if (!userText.trim()) return;

      const userMsg: Message = {
        id: Math.random().toString(36).substring(7),
        sender: "user",
        text: userText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, userMsg]);
      setTranscript("");
      setAgentState("thinking");

      setTimeout(() => {
        const responseText = generateAgentResponse(userText, selectedLang);
        const agentMsg: Message = {
          id: Math.random().toString(36).substring(7),
          sender: "agent",
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, agentMsg]);
        speakText(responseText, selectedLang, selectedPersona);
      }, 450);
    },
    [generateAgentResponse, speakText, selectedLang, selectedPersona]
  );

  const toggleCall = () => {
    if (isCallActive) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      setIsCallActive(false);
      setAgentState("idle");
      setAudioLevel(0);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(7),
          sender: "agent",
          text: selectedLang === "mr" ? "कॉल समाप्त झाला. आपण पुन्हा कधीही बोलू शकता!" : selectedLang === "hi" ? "कॉल समाप्त हुआ। आप कभी भी दोबारा बात कर सकते हैं!" : "Call ended. Feel free to start another session anytime!",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } else {
      setIsCallActive(true);
      const initialGreeting: Message = {
        id: Math.random().toString(36).substring(7),
        sender: "agent",
        text: selectedPersona.welcome,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages([initialGreeting]);
      speakText(selectedPersona.welcome, selectedLang, selectedPersona);
    }
  };

  const startListening = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. You can click on the sample prompt chips below!");
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      
      // Set language for speech recognition
      if (selectedLang === "mr") {
        recognition.lang = "mr-IN";
      } else if (selectedLang === "hi") {
        recognition.lang = "hi-IN";
      } else {
        recognition.lang = "en-IN";
      }

      recognition.onstart = () => {
        setAgentState("listening");
        setTranscript(selectedLang === "mr" ? "तुमचा आवाज ऐकत आहे..." : selectedLang === "hi" ? "आपकी आवाज़ सुन रहे हैं..." : "Listening for your voice...");
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
        if (event.results[0].isFinal) {
          handleUserMessage(currentTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setAgentState("idle");
        setTranscript("");
      };

      recognition.onend = () => {
        if (agentState === "listening") {
          setAgentState("idle");
          setTranscript("");
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error("Mic initialization error:", err);
      setAgentState("idle");
    }
  };

  return (
    <div
      className={"relative flex flex-col rounded-2xl border border-violet-500/20 bg-gradient-to-b from-zinc-900/90 to-zinc-950/95 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300 " + (compact ? "p-4" : "p-6 sm:p-8") + " " + className}
    >
      {/* Language Selector Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-zinc-300">Language / भाषा:</span>
        </div>
        <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/10">
          {(["en", "hi", "mr"] as Language[]).map((lang) => {
            const labels = { en: "English", hi: "हिन्दी", mr: "मराठी" };
            return (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={"rounded-lg px-3 py-1 text-xs font-semibold transition-all " + (selectedLang === lang ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/40 scale-105" : "text-zinc-400 hover:text-white hover:bg-white/[0.06]")}
              >
                {labels[lang]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="grid size-10 place-items-center rounded-xl bg-violet-600/30 border border-violet-500/30 text-sm font-bold text-violet-300">
              {selectedPersona.avatar}
            </span>
            <span
              className={"absolute -bottom-1 -right-1 size-3.5 rounded-full border-2 border-zinc-900 " + (isCallActive ? (agentState === "speaking" ? "bg-violet-400 animate-pulse" : agentState === "listening" ? "bg-emerald-400 animate-ping" : "bg-emerald-500") : "bg-zinc-500")}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white text-base">{selectedPersona.name}</h3>
              <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[11px] font-medium text-violet-400 border border-violet-500/20">
                {selectedPersona.langLabel} Voice Agent
              </span>
            </div>
            <p className="text-xs text-zinc-400">{selectedPersona.role}</p>
          </div>
        </div>

        {/* Persona Switcher for current language */}
        <div className="flex items-center gap-1.5 bg-white/[0.04] p-1 rounded-xl border border-white/10">
          {currentLangPersonas.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPersona(p);
                if (isCallActive) {
                  speakText(p.lang === "mr" ? "मी " + p.name + " आहे. बोला, कशी मदत करू?" : p.lang === "hi" ? "मैं " + p.name + " हूँ। बताइए, क्या सहायता करूँ?" : "Switched to " + p.name + ". How can I help?", selectedLang, p);
                }
              }}
              title={p.name + " - " + p.role}
              className={"rounded-lg px-2.5 py-1 text-xs font-medium transition-all " + (selectedPersona.id === p.id ? "bg-violet-600 text-white shadow-md shadow-violet-600/30" : "text-zinc-400 hover:text-white hover:bg-white/[0.05]")}
            >
              {p.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Voice Visualizer Orb & Waveform Center */}
      <div className="relative my-6 flex flex-col items-center justify-center py-6">
        {/* Ambient Glows */}
        <div
          className={"absolute size-48 rounded-full blur-3xl transition-all duration-700 pointer-events-none " + (isCallActive ? (agentState === "speaking" ? "bg-violet-600/30 scale-125" : agentState === "listening" ? "bg-emerald-600/30 scale-110" : "bg-blue-600/20 scale-100") : "bg-violet-900/10 scale-75")}
        />

        {/* Central Voice Orb */}
        <div className="relative grid place-items-center">
          {isCallActive && (
            <>
              <div
                className={"absolute size-32 rounded-full border border-violet-500/30 transition-all duration-1000 " + (agentState === "speaking" || agentState === "listening" ? "animate-ping opacity-60" : "opacity-20")}
              />
              <div
                className={"absolute size-40 rounded-full border border-violet-400/20 transition-all duration-700 " + (agentState === "speaking" ? "scale-110 animate-pulse" : "scale-95")}
              />
            </>
          )}

          {/* Core Orb */}
          <button
            onClick={toggleCall}
            className={"relative size-24 rounded-full flex flex-col items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer " + (isCallActive ? (agentState === "speaking" ? "bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-indigo-500 shadow-violet-500/50" : agentState === "listening" ? "bg-gradient-to-tr from-emerald-600 to-teal-400 shadow-emerald-500/50 animate-pulse" : "bg-gradient-to-tr from-violet-600 to-indigo-600 shadow-violet-500/30") : "bg-gradient-to-tr from-zinc-800 to-zinc-700 hover:from-violet-700 hover:to-indigo-600 shadow-black/50")}
          >
            <span className="text-xl font-bold text-white">
              {isCallActive
                ? agentState === "speaking"
                  ? "Speaking"
                  : agentState === "listening"
                  ? "Listening"
                  : "Active"
                : "Call"}
            </span>
            <span className="mt-1 text-[10px] font-semibold text-white/90 uppercase tracking-wider">
              {isCallActive ? "Live Session" : "Start Call"}
            </span>
          </button>
        </div>

        {/* Dynamic Status Text */}
        <div className="mt-5 flex items-center gap-2">
          <span
            className={"size-2 rounded-full " + (isCallActive ? (agentState === "speaking" ? "bg-violet-400 animate-pulse" : agentState === "listening" ? "bg-emerald-400 animate-ping" : agentState === "thinking" ? "bg-amber-400 animate-bounce" : "bg-emerald-500") : "bg-zinc-600")}
          />
          <p className="text-xs font-medium tracking-wide text-zinc-300">
            {!isCallActive
              ? selectedLang === "mr" ? "एआय एजंट तयार आहे - कॉल सुरू करण्यासाठी क्लिक करा" : selectedLang === "hi" ? "एआई एजेंट तैयार है - कॉल शुरू करने के लिए क्लिक करें" : "Agent Ready - Click to start voice test"
              : agentState === "speaking"
              ? selectedLang === "mr" ? "एजंट बोलत आहे..." : selectedLang === "hi" ? "एजेंट बोल रहा है..." : "Agent speaking..."
              : agentState === "listening"
              ? selectedLang === "mr" ? "तुमचा आवाज ऐकत आहे..." : selectedLang === "hi" ? "आपकी आवाज़ सुन रहे हैं..." : "Listening to your voice..."
              : agentState === "thinking"
              ? selectedLang === "mr" ? "उत्तर तयार करत आहे..." : selectedLang === "hi" ? "उत्तर तैयार कर रहे हैं..." : "Synthesizing response..."
              : selectedLang === "mr" ? "कॉल कनेक्ट झाला - बोला किंवा खालील पर्याय निवडा" : selectedLang === "hi" ? "कॉल कनेक्ट हो गया - बोलिए या नीचे विकल्प चुनें" : "Call connected - Say something or pick a prompt"}
          </p>
        </div>

        {/* Equalizer Waveform Bars */}
        <div className="mt-3 flex items-center gap-1 h-8">
          {[20, 45, 80, 55, 95, 70, 35, 90, 60, 40, 85, 50, 30].map((baseHeight, i) => {
            const dynamicHeight =
              agentState === "speaking"
                ? Math.max(15, (baseHeight * audioLevel) / 70)
                : agentState === "listening"
                ? Math.max(10, Math.random() * 60 + 10)
                : 6;

            return (
              <span
                key={i}
                style={{ height: dynamicHeight + "%" }}
                className={"w-1 rounded-full transition-all duration-150 " + (agentState === "speaking" ? "bg-gradient-to-t from-violet-500 to-fuchsia-400" : agentState === "listening" ? "bg-emerald-400" : "bg-zinc-700")}
              />
            );
          })}
        </div>
      </div>

      {/* Live Transcript Stream */}
      <div className="flex-1 min-h-[140px] max-h-[220px] overflow-y-auto rounded-xl border border-white/5 bg-black/40 p-3 space-y-2.5">
        {messages.length === 0 ? (
          <div className="grid h-full place-items-center py-6 text-center text-xs text-zinc-500">
            <p>
              {selectedLang === "mr"
                ? "एआय व्हॉईस एजंटशी बोलण्यासाठी \"Start Call\" वर क्लिक करा."
                : selectedLang === "hi"
                ? "एआई वॉयस एजेंट से बात करने के लिए \"Start Call\" पर क्लिक करें।"
                : "Click \"Start Call\" to begin a conversation with your AI Voice Agent."}
            </p>
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={"flex flex-col " + (m.sender === "user" ? "items-end" : "items-start")}
            >
              <div className="flex items-center gap-1.5 mb-1 px-1">
                <span className="text-[10px] text-zinc-400 font-medium">
                  {m.sender === "user" ? (selectedLang === "mr" ? "तुम्ही" : selectedLang === "hi" ? "आप" : "You") : selectedPersona.name}
                </span>
                <span className="text-[9px] text-zinc-600">{m.timestamp}</span>
              </div>
              <div
                className={"max-w-[88%] rounded-xl px-3.5 py-2 text-xs leading-relaxed " + (m.sender === "user" ? "bg-violet-600 text-white rounded-br-none" : "bg-zinc-800/90 text-zinc-200 border border-white/10 rounded-bl-none")}
              >
                {m.text}
              </div>
            </div>
          ))
        )}
        {transcript && (
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-emerald-400 mb-1 px-1">
              {selectedLang === "mr" ? "तुम्ही (बोलत आहात...)" : selectedLang === "hi" ? "आप (बोल रहे हैं...)" : "You (Speaking...)"}
            </span>
            <div className="max-w-[88%] rounded-xl px-3.5 py-2 text-xs bg-violet-600/60 text-white italic animate-pulse">
              {transcript}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Interactive Quick Prompts for Selected Language */}
      <div className="mt-4">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
          {selectedLang === "mr" ? "हे प्रश्न विचारून पहा:" : selectedLang === "hi" ? "ये प्रश्न पूछकर देखें:" : "Try asking these:"}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {PROMPTS_BY_LANG[selectedLang].map((prompt) => (
            <button
              key={prompt}
              onClick={() => {
                if (!isCallActive) setIsCallActive(true);
                handleUserMessage(prompt);
              }}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300 hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-white transition-all text-left"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Control Action Bar */}
      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <div className="flex items-center gap-2">
          {supportedRecognition && (
            <button
              onClick={startListening}
              disabled={!isCallActive || agentState === "speaking"}
              className={"inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all " + (agentState === "listening" ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 animate-pulse" : "bg-white/[0.06] text-zinc-300 hover:bg-white/[0.1] hover:text-white disabled:opacity-40")}
            >
              <span>{agentState === "listening" ? (selectedLang === "mr" ? "ऐकत आहे..." : selectedLang === "hi" ? "सुन रहे हैं..." : "Listening...") : (selectedLang === "mr" ? "माईक सुरू करा" : selectedLang === "hi" ? "माइक शुरू करें" : "Push to Speak")}</span>
            </button>
          )}

          <button
            onClick={() => {
              setIsMuted(!isMuted);
              if (typeof window !== "undefined" && "speechSynthesis" in window) {
                window.speechSynthesis.cancel();
              }
            }}
            className="rounded-lg bg-white/[0.06] px-2.5 py-1.5 text-xs text-zinc-400 hover:text-white hover:bg-white/[0.1] transition"
            title={isMuted ? "Unmute Voice" : "Mute Voice"}
          >
            {isMuted ? "Audio Off" : "Audio On"}
          </button>
        </div>

        <button
          onClick={toggleCall}
          className={"inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-md transition-all " + (isCallActive ? "bg-rose-600 hover:bg-rose-500 shadow-rose-600/30" : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-violet-600/30")}
        >
          <span>{isCallActive ? (selectedLang === "mr" ? "कॉल समाप्त करा" : selectedLang === "hi" ? "कॉल समाप्त करें" : "End Call") : (selectedLang === "mr" ? "व्हॉईस कॉल सुरू करा" : selectedLang === "hi" ? "वॉयस कॉल शुरू करें" : "Start Live Voice Call")}</span>
        </button>
      </div>
    </div>
  );
}
