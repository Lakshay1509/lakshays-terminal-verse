import { useState, useEffect, useRef, useCallback } from 'react';
import { CommandHandler } from './CommandHandler';
import { useTerminalSounds } from '@/hooks/useTerminalSounds';
import { StarField } from './StarField';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

export const Terminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isBooting, setIsBooting] = useState(true);
  const [autocompleteOptions, setAutocompleteOptions] = useState<string[]>([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const commandHandler = new CommandHandler();
  const { playKeyboardSound, playBootSound, playCommandSound } = useTerminalSounds();

  const availableCommands = [
    'about', 'projects', 'skills', 'experience', 'awards', 'contact', 'help', 'clear', 'whoami', 'pwd', 'ls'
  ];

  // Boot sequence
  useEffect(() => {
    const bootSequence = async () => {
      playBootSound();
      
      const bootMessages = [
        'Initializing Lakshay Gupta Portfolio System...',
        'Loading neural networks... ████████████ 100%',
        'Establishing secure connection... ✓',
        'Mounting file systems... ✓',
        'Starting interactive shell... ✓',
        '',
        '╭─────────────────────────────────────────────────╮',
        '│       Welcome to Lakshay\'s Terminal Portfolio!  │',
        '╰─────────────────────────────────────────────────╯',
        '',
        '🚀 Type "help" to see available commands',
        '💡 Use TAB for autocomplete, ↑↓ for history',
        ''
      ];

      for (let i = 0; i < bootMessages.length; i++) {
        await new Promise(resolve => setTimeout(resolve, i < 5 ? 400 : 200));
        setLines(prev => [...prev, {
          id: `boot-${i}`,
          type: 'output',
          content: bootMessages[i],
          timestamp: new Date()
        }]);
      }
      
      setIsBooting(false);
    };

    bootSequence();
  }, [playBootSound]);

  // Auto-focus input
  useEffect(() => {
    if (!isBooting && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isBooting]);

  // Scroll to bottom when new lines are added
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const executeCommand = useCallback((command: string) => {
    const trimmed = command.trim();
    if (!trimmed) return;

    playCommandSound();

    // Add command to history
    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    // Add input line
    const inputLine: TerminalLine = {
      id: `input-${Date.now()}`,
      type: 'input',
      content: trimmed,
      timestamp: new Date()
    };

    // Execute command and get output
    const output = commandHandler.execute(trimmed);
    const outputLines: TerminalLine[] = output.map((line, index) => ({
      id: `output-${Date.now()}-${index}`,
      type: line.startsWith('Error:') ? 'error' : 'output',
      content: line,
      timestamp: new Date()
    }));

    // Handle special commands
    if (trimmed === 'clear') {
      setLines([]);
      return;
    }

    setLines(prev => [...prev, inputLine, ...outputLines]);
  }, [commandHandler, playCommandSound]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Keyboard shortcuts
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      setLines([]);
      return;
    }
    
    if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      setLines([]);
      return;
    }

    if (e.key === 'Enter') {
      executeCommand(currentInput);
      setCurrentInput('');
      setShowAutocomplete(false);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        if (newIndex === commandHistory.length - 1) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (currentInput) {
        const matches = availableCommands.filter(cmd => 
          cmd.startsWith(currentInput.toLowerCase())
        );
        if (matches.length === 1) {
          setCurrentInput(matches[0]);
          setShowAutocomplete(false);
        } else if (matches.length > 1) {
          setAutocompleteOptions(matches);
          setShowAutocomplete(true);
        }
      }
    } else if (e.key === 'Escape') {
      setShowAutocomplete(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Play keyboard sound only when typing (not deleting)
    if (value.length > currentInput.length) {
      playKeyboardSound();
    }
    
    setCurrentInput(value);
    
    if (value) {
      const matches = availableCommands.filter(cmd => 
        cmd.startsWith(value.toLowerCase())
      );
      if (matches.length > 1) {
        setAutocompleteOptions(matches);
        setShowAutocomplete(true);
      } else {
        setShowAutocomplete(false);
      }
    } else {
      setShowAutocomplete(false);
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const getPrompt = () => {
    return `${isBooting ? '' : 'lakshay@portfolio'}${isBooting ? '' : ':~$'}`;
  };

  return (
    <div className="terminal-container scan-lines">
      <StarField />
      <div className="terminal-screen animate-boot-up">
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="terminal-dot red"></div>
          <div className="terminal-dot yellow"></div>
          <div className="terminal-dot green"></div>
          <span className="text-muted-foreground text-xs ml-4">
            lakshay@portfolio: ~
          </span>
        </div>

        {/* Terminal Output */}
        <div ref={outputRef} className="terminal-output">
          {lines.map((line) => (
            <div key={line.id} className="terminal-line animate-fade-in">
              {line.type === 'input' ? (
                <>
                  <span className="terminal-prompt text-terminal-green">
                    {getPrompt()}
                  </span>
                  <span className="text-foreground">{line.content}</span>
                </>
              ) : (
                <div className={`${
                  line.type === 'error' 
                    ? 'text-red-400' 
                    : line.content.includes('✓') 
                      ? 'text-terminal-green'
                      : line.content.includes('████')
                        ? 'text-terminal-cyan'
                        : 'text-foreground'
                } ${line.content ? 'typewriter' : ''}`}>
                  {line.content || '\u00A0'}
                </div>
              )}
            </div>
          ))}

          {/* Current Input Line */}
          {!isBooting && (
            <div className="terminal-line">
              <span className="terminal-prompt text-terminal-green">
                {getPrompt()}
              </span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="terminal-input"
                spellCheck={false}
                autoComplete="off"
              />
              <span className="terminal-cursor"></span>
            </div>
          )}

          {/* Autocomplete */}
          {showAutocomplete && autocompleteOptions.length > 0 && (
            <div className="ml-4 mt-2 p-2 bg-card border border-border rounded-md">
              <div className="text-sm text-muted-foreground mb-1">Available commands:</div>
              {autocompleteOptions.map((option, index) => (
                <div key={index} className="text-terminal-cyan text-sm">
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground space-y-1">
          <div className="flex flex-wrap gap-4">
            <span><kbd className="text-terminal-cyan">TAB</kbd> autocomplete</span>
            <span><kbd className="text-terminal-cyan">↑↓</kbd> history</span>
            <span><kbd className="text-terminal-cyan">Ctrl+K</kbd> clear</span>
            <span><kbd className="text-terminal-cyan">ESC</kbd> cancel</span>
          </div>
          <div className="text-center opacity-70">
            💡 Start with <span className="text-terminal-yellow">"help"</span> • 
            Built with ❤️ by <span className="text-terminal-cyan">Lakshay Gupta</span>
          </div>
        </div>
      </div>
    </div>
  );
};