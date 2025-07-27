export class CommandHandler {
  private commands: { [key: string]: () => string[] } = {
    help: () => this.getHelp(),
    about: () => this.getAbout(),
    projects: () => this.getProjects(),
    skills: () => this.getSkills(),
    experience: () => this.getExperience(),
    awards: () => this.getAwards(),
    contact: () => this.getContact(),
    whoami: () => this.getWhoami(),
    pwd: () => this.getPwd(),
    ls: () => this.getLs(),
    clear: () => [''],
    // Easter eggs
    sudo: () => this.getSudo(),
    hack: () => this.getHack(),
    hacks: () => this.getHack(),
    matrix: () => this.getMatrix(),
    'sudo rm -rf /': () => this.getDangerous(),
    exit: () => this.getExit(),
  };

  execute(command: string): string[] {
    const cmd = command.toLowerCase().trim();
    
    if (this.commands[cmd]) {
      return this.commands[cmd]();
    }
    
    // Check for partial matches and suggest corrections
    const suggestions = this.getSuggestions(cmd);
    if (suggestions.length > 0) {
      return [
        `Command '${command}' not found.`,
        `Did you mean: ${suggestions.join(', ')}?`,
        `Type 'help' to see all available commands.`
      ];
    }
    
    return [
      `Command '${command}' not found.`,
      `Type 'help' to see all available commands.`
    ];
  }

  private getSuggestions(cmd: string): string[] {
    const allCommands = Object.keys(this.commands);
    return allCommands.filter(command => 
      command.includes(cmd) || cmd.includes(command)
    ).slice(0, 3);
  }

  private getHelp(): string[] {
    return [
      '╭─────────────────────────────────────────────────╮',
      '│              Available Commands                  │',
      '╰─────────────────────────────────────────────────╯',
      '',
      '🧑‍💻 Personal Info:',
      '   about      - Learn about Lakshay Gupta',
      '   contact    - Get contact information',
      '   whoami     - Display current user',
      '',
      '💼 Professional:',
      '   projects   - View my projects and demos',
      '   skills     - See technical skills',
      '   experience - Work experience and roles',
      '   awards     - Achievements and recognitions',
      '',
      '🖥️  System Commands:',
      '   ls         - List directory contents',
      '   pwd        - Print working directory',
      '   clear      - Clear terminal screen',
      '   help       - Show this help message',
      '',
      '🎮 Easter Eggs:',
      '   Try: sudo, hack, matrix, exit',
      '',
      '💡 Tips:',
      '   • Use TAB for autocomplete',
      '   • Use ↑↓ arrows for command history',
      '   • Commands are case-insensitive',
      ''
    ];
  }

  private getAbout(): string[] {
    return [
      '╭─────────────────────────────────────────────────╮',
      '│                 About Lakshay                    │',
      '╰─────────────────────────────────────────────────╯',
      '',
      '👋 Hey there! I\'m Lakshay Gupta',
      '',
      '🎓 Education:',
      '   • B.Tech Computer Science at NSUT Delhi',
      '   • Specializing in AI, Blockchain & Web Development',
      '',
      '💡 Passion:',
      '   Building innovative solutions that solve real-world',
      '   problems using cutting-edge technologies like AI,',
      '   blockchain, and modern web frameworks.',
      '',
      '🚀 Current Focus:',
      '   • Full-stack web development',
      '   • AI/ML applications in healthcare',
      '   • Blockchain-based financial solutions',
      '   • Open source contributions',
      '',
      '🎯 Mission:',
      '   Creating technology that makes a positive impact',
      '   on people\'s lives while continuously learning',
      '   and growing as a developer.',
      ''
    ];
  }

  private getProjects(): string[] {
    return [
      '╭──────────────────────────────────────╮',
      '│             My Projects              │',
      '╰──────────────────────────────────────╯',
      '',
      '🎵 Resonanze - AI Voice Health Diagnostic',
      '   ├─ AI-powered voice analysis for health',
      '   ├─ 90% accuracy in diagnostics',
      '   ├─ Tech: Python, TensorFlow, React',
      '   └─ github.com/Lakshay1509/Resonanze',
      '',
      '📊 Graph Visualizer - Algorithm Learning',
      '   ├─ Interactive BFS/DFS visualization',
      '   ├─ Educational tool for CS students',
      '   ├─ Tech: React, D3.js, TypeScript',
      '   └─ github.com/Lakshay1509/graph_visualizer',
      '',
      '💰 Cred Guru - Smart Finance Tracker',
      '   ├─ AI + Blockchain finance management',
      '   ├─ Smart contract integration',
      '   ├─ Tech: Solidity, Web3.js, React',
      '   └─ github.com/Lakshay1509/HackTU-loan',
      '',
      '🔗 More: github.com/Lakshay1509',
      ''
    ];
  }

  private getSkills(): string[] {
    return [
      '╭─────────────────────────────────────────────────╮',
      '│                Technical Skills                  │',
      '╰─────────────────────────────────────────────────╯',
      '',
      '💻 Programming Languages:',
      '   ├─ C++        ████████████ Expert',
      '   ├─ Python     ███████████▒ Advanced',
      '   ├─ JavaScript ███████████▒ Advanced',
      '   ├─ TypeScript ██████████▒▒ Proficient',
      '   └─ SQL        █████████▒▒▒ Proficient',
      '',
      '🌐 Web Development:',
      '   ├─ React.js   ███████████▒ Advanced',
      '   ├─ Next.js    ██████████▒▒ Proficient',
      '   ├─ Node.js    ██████████▒▒ Proficient',
      '   ├─ Express    █████████▒▒▒ Proficient',
      '   └─ Tailwind   ███████████▒ Advanced',
      '',
      '🛠️  Tools & Technologies:',
      '   ├─ Git/GitHub ███████████▒ Advanced',
      '   ├─ Flask      █████████▒▒▒ Proficient',
      '   ├─ Langchain  █████████▒▒▒ Proficient',
      '   ├─ MongoDB    ████████▒▒▒▒ Intermediate',
      '   └─ Docker     ███████▒▒▒▒▒ Learning',
      '',
      '🧠 Soft Skills:',
      '   ├─ Problem Solving    ████████████ Expert',
      '   ├─ Communication      ███████████▒ Advanced',
      '   ├─ Team Collaboration ███████████▒ Advanced',
      '   └─ Leadership         ██████████▒▒ Proficient',
      ''
    ];
  }

  private getExperience(): string[] {
    return [
      '╭─────────────────────────────────────────────────╮',
      '│               Work Experience                    │',
      '╰─────────────────────────────────────────────────╯',
      '',
      '💼 Frontend Developer',
      '   📍 Project AVLOKAN',
      '   📅 May 2025 - July 2025',
      '   ├─ Built scalable certificate automation system',
      '   ├─ Served 10,000+ users with 99.9% uptime',
      '   ├─ Implemented responsive UI with React & Tailwind',
      '   ├─ Optimized performance reducing load time by 40%',
      '   └─ Collaborated with cross-functional team of 8',
      '',
      '🎓 Computer Science Student',
      '   📍 Netaji Subhas University of Technology (NSUT)',
      '   📅 2023 - Present',
      '   ├─ Pursuing B.Tech in Computer Science',
      '   ├─ Relevant Coursework: DSA, OOPS, DBMS, AI/ML',
      '   └─ Active in coding competitions and hackathons',

      '',
      '🚀 Looking for opportunities in:',
      '   ├─ Full-stack Development',
      '   ├─ AI/ML Engineering',
      '   ├─ Blockchain Development',
      '   └─ Open Source Contributions',
      ''
    ];
  }

  private getAwards(): string[] {
    return [
      '╭─────────────────────────────────────────────────╮',
      '│            Awards & Achievements                 │',
      '╰─────────────────────────────────────────────────╯',
      '',
      '🏆 Programming Stuff:',
      '   ├─ LeetCode Max Rating: 1820 (Top 6% globally)',
      '   └─ Solved 600+ algorithmic problems',
      
      '',
      '🥇 Hackathon Victories:',
      '   ├─ 1st Place - Code Nakshatra 2024',
      '   ├─ 1st Place - Hackonanz Championship',
      '   ├─ Finalist - HackTU (Thapar University)',
      '   └─ Winner - Multiple university-level events',
      '',
    ];
  }

  private getContact(): string[] {
    return [
      '╭─────────────────────────────────────────────────╮',
      '│                 Contact Info                     │',
      '╰─────────────────────────────────────────────────╯',
      '',
      '📧 Email:',
      '   gupta15.lakshay@gmail.com',
      '',
      '📱 Phone:',
      '   +91 8882347814',
      '',
      '🔗 Professional Links:',
      '   ├─ GitHub: github.com/Lakshay1509',
      '   └─ LinkedIn: linkedin.com/in/lakshay-gupta-529a1428a',
      '',
      '💼 Portfolio:',
      '   You\'re already here! 😄',
      '',
      '🌍 Location:',
      '   New Delhi, India',
      '',
      '⏰ Availability:',
      '   Open for full-time opportunities and',
      '   interesting freelance projects!',
      '',
      '📬 Feel free to reach out for:',
      '   ├─ Job opportunities',
      '   ├─ Collaboration proposals',
      '   ├─ Technical discussions',
      '   └─ Just saying hi! 👋',
      ''
    ];
  }

  private getWhoami(): string[] {
    return [
      'lakshay',
      '',
      'Current user: Lakshay Gupta',
      'Role: Full-Stack Developer & CS Student',
      'Status: Available for opportunities',
      'Mood: Ready to build amazing things! 🚀'
    ];
  }

  private getPwd(): string[] {
    return ['/home/lakshay/portfolio'];
  }

  private getLs(): string[] {
    return [
      'total 42',
      'drwxr-xr-x  2 lakshay lakshay 4096 Dec 2024 about.txt',
      'drwxr-xr-x  2 lakshay lakshay 4096 Dec 2024 projects/',
      'drwxr-xr-x  2 lakshay lakshay 4096 Dec 2024 skills.md',
      'drwxr-xr-x  2 lakshay lakshay 4096 Dec 2024 experience.json',
      'drwxr-xr-x  2 lakshay lakshay 4096 Dec 2024 awards.log',
      'drwxr-xr-x  2 lakshay lakshay 4096 Dec 2024 contact.vcard',
      '-rw-r--r--  1 lakshay lakshay  420 Dec 2024 README.md',
      '',
      'Use commands like "about", "projects", etc. to view contents!'
    ];
  }

  // Easter Eggs
  private getSudo(): string[] {
    return [
      'Nice try! 😄',
      '',
      'lakshay is not in the sudoers file.',
      'This incident will be reported to... well, nobody.',
      '',
      'But here\'s a secret: I have sudo access to your attention! 🔐'
    ];
  }

  private getHack(): string[] {
    return [
      'Initiating hack sequence...',
      'Accessing mainframe... ████████████ 100%',
      'Bypassing firewall... ████████████ 100%',
      'Downloading files... ████████████ 100%',
      '',
      '🎉 Congratulations! You\'ve successfully hacked into...',
      '   my resume! Here\'s what you found:',
      '',
      '💎 SECRET FILE: ultimate_skills.txt',
      '   - Debugging other people\'s code ⭐⭐⭐⭐⭐',
      '   - Googling error messages ⭐⭐⭐⭐⭐',
      '   - Turning coffee into code ⭐⭐⭐⭐⭐',
      '   - Pretending to understand regex ⭐⭐⭐',
      '',
      'Type "projects" to see my real hacking skills! 🚀'
    ];
  }

  private getMatrix(): string[] {
    return [
      'Wake up, Neo...',
      '',
      'The Matrix has you... following @Lakshay1509',
      '',
      '🔴 Red pill: Check out my projects',
      '🔵 Blue pill: Go back to your boring terminal',
      '',
      'Choose wisely... or just type "projects" 😉'
    ];
  }

  private getDangerous(): string[] {
    return [
      '⚠️  WARNING: Dangerous command detected!',
      '',
      '🛡️  System protection engaged.',
      '   Unable to delete portfolio...',
      '   Too many awesome projects to lose!',
      '',
      '💡 Instead, why not "rm -rf" your doubts about hiring me?',
      '   Try "contact" to get in touch! 😄'
    ];
  }

  private getExit(): string[] {
    return [
      'Attempting to exit...',
      '',
      'Error: Cannot exit from awesome portfolio!',
      'This terminal is too cool to leave! 😎',
      '',
      'Instead, try exploring more:',
      '• "projects" - See my work',
      '• "contact" - Let\'s connect!',
      '',
      'Or close the tab if you must... 😢'
    ];
  }
}