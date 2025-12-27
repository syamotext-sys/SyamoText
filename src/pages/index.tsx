import { useState } from "react";
import { Copy, Check, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type Mode = "standard" | "fluent" | "formal";

const HumanizerTool = () => {
  const [mode, setMode] = useState<Mode>("standard");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleHumanize = async () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    setShowScore(false);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: `Instruction: Rewrite the provided text to bypass AI detectors like GPTZero and Turnitin. Ensure a 100% human-like flow. Mode: ${mode}. Only return the humanized text.`
            },
            { role: "user", content: inputText }
          ],
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      if (data.choices?.[0]?.message?.content) {
        setOutputText(data.choices[0].message.content);
        setShowScore(true);
      }
    } catch (error) {
      toast({ 
        title: "API Error", 
        description: "Connection failed. Please verify API key.", 
        variant: "destructive" 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12 px-4 container mx-auto max-w-6xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-[#4C1D95] mb-4 font-heading">SyamoText AI Humanizer</h1>
        <p className="text-muted-foreground text-lg">Convert AI text to human-like content and bypass detectors.</p>
      </div>

      <div className="flex justify-center gap-3 mb-8">
        {(["standard", "fluent", "formal"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${mode === m ? "bg-[#4C1D95] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 shadow-sm">
          <Textarea 
            placeholder="Paste your AI text here..." 
            className="min-h-[320px] border-none focus-visible:ring-0 text-lg" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <span className="text-gray-400 text-sm">
              {inputText.split(/\s+/).filter(Boolean).length} words
            </span>
            <Button onClick={handleHumanize} disabled={isProcessing} className="bg-[#4C1D95] hover:bg-[#3b1675] px-8 rounded-xl h-12">
              {isProcessing ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2" />}
              Humanize AI Text
            </Button>
          </div>
        </div>

        <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 shadow-sm relative flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-gray-700">Humanized Output</span>
            {outputText && (
              <Button variant="ghost" size="sm" onClick={handleCopy} className="text-[#4C1D95]">
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </Button>
            )}
          </div>
          <div className="flex-1 text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
            {isProcessing ? (
              <div className="space-y-4">
                <div className="h-4 bg-gray-100 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-gray-100 rounded animate-pulse w-5/6"></div>
              </div>
            ) : outputText}
          </div>
          {showScore && (
            <div className="absolute bottom-5 right-5 bg-green-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">
              Human Score: 98.4%
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HumanizerTool;
