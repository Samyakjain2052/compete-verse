
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import GroqService from '@/services/groq-service';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatbotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your BattleCode assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      // Get response from Groq API
      const response = await GroqService.getChatResponse(message);
      
      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      // Handle error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I couldn't process your request. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat button */}
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 md:w-96 shadow-xl z-50 flex flex-col max-h-[32rem]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>BC</AvatarFallback>
              </Avatar>
              BattleCode Assistant
            </CardTitle>
          </CardHeader>
          
          <CardContent className="overflow-y-auto flex-1 max-h-80">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2 rounded-lg ${
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <span className="text-xs opacity-70 block mt-1">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          
          <CardFooter className="pt-2">
            <div className="flex w-full items-center gap-2">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="min-h-10 flex-1"
                rows={1}
                disabled={isLoading}
              />
              <Button 
                size="icon" 
                onClick={handleSendMessage} 
                disabled={!message.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default ChatbotButton;
