import React, { useState, useEffect } from 'react';
import { useConversation } from '@11labs/react';
import { Avatar } from './Avatar';
import { AvatarSelection } from './AvatarSelection';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { useToast } from './ui/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const VoiceAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState("9sFroVSgPhgpGak8Jygu");
  const conversation = useConversation();
  const { toast } = useToast();
  
  const handleStartConversation = async () => {
    try {
      setIsListening(true);
      await conversation.startSession({
        agentId: selectedAssistant,
      });
      toast({
        title: "Conversa iniciada",
        description: "Você pode começar a falar agora.",
      });
    } catch (error) {
      console.error('Erro ao iniciar conversa:', error);
      setIsListening(false);
      toast({
        title: "Erro ao iniciar conversa",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleStopConversation = async () => {
    try {
      await conversation.endSession();
      setIsListening(false);
      toast({
        title: "Conversa encerrada",
        description: "Obrigado por conversar comigo!",
      });
    } catch (error) {
      console.error('Erro ao encerrar conversa:', error);
      toast({
        title: "Erro ao encerrar conversa",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleAssistantSelect = async (assistantId: string) => {
    if (isListening) {
      await handleStopConversation();
    }
    setSelectedAssistant(assistantId);
  };

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .catch((error) => {
        console.error('Erro ao acessar microfone:', error);
        toast({
          title: "Erro ao acessar microfone",
          description: "Por favor, permita o acesso ao microfone para usar o assistente.",
          variant: "destructive",
        });
      });

    return () => {
      conversation.endSession().catch(console.error);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-8">
      <Card className="w-full max-w-2xl p-6 space-y-6">
        <div className="flex flex-col items-center gap-4">
          <AvatarSelection
            selectedAssistant={selectedAssistant}
            onSelect={handleAssistantSelect}
          />
          <Avatar 
            isSpeaking={conversation.isSpeaking} 
            isListening={isListening}
            assistantId={selectedAssistant}
          />
          <div className="space-x-4">
            <Button
              onClick={isListening ? handleStopConversation : handleStartConversation}
              variant={isListening ? "destructive" : "default"}
            >
              {isListening ? "Parar de Escutar" : "Começar a Escutar"}
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};