import React, { useState, useEffect } from 'react';
import { useConversation } from '@11labs/react';
import { Avatar } from './Avatar';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const fraseDoDia = [
  "A vida é como um eco: você recebe de volta aquilo que emite.",
  "Cada novo dia é uma nova oportunidade para ser melhor.",
  "A felicidade não é algo pronto. Ela vem de suas próprias ações.",
  "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
  "Seja a mudança que você quer ver no mundo."
];

export const VoiceAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const conversation = useConversation();
  
  const getFraseDoDia = () => {
    const randomIndex = Math.floor(Math.random() * fraseDoDia.length);
    return fraseDoDia[randomIndex];
  };

  const handleStartConversation = async () => {
    try {
      setIsListening(true);
      await conversation.startSession({
        agentId: "your-agent-id", // Você precisará substituir isso com seu ID de agente
      });
      
      // Adiciona a mensagem de apresentação e frase do dia
      const frase = getFraseDoDia();
      const mensagemInicial = `Olá! Eu sou Iara, sua assistente virtual. Estou aqui para ajudar você! \n\nFrase do dia: "${frase}"`;
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: mensagemInicial
      }]);
      
    } catch (error) {
      console.error('Erro ao iniciar conversa:', error);
      setIsListening(false);
    }
  };

  const handleStopConversation = async () => {
    try {
      await conversation.endSession();
      setIsListening(false);
    } catch (error) {
      console.error('Erro ao encerrar conversa:', error);
    }
  };

  useEffect(() => {
    // Solicitar permissão do microfone quando o componente montar
    navigator.mediaDevices.getUserMedia({ audio: true })
      .catch((error) => console.error('Erro ao acessar microfone:', error));

    return () => {
      // Limpeza
      conversation.endSession().catch(console.error);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-8">
      <Card className="w-full max-w-2xl p-6 space-y-6">
        <div className="flex flex-col items-center gap-4">
          <Avatar 
            isSpeaking={conversation.isSpeaking} 
            isListening={isListening} 
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