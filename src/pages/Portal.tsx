import { useState, useEffect, useRef } from 'react';
import { 
  Lock, 
  Shield, 
  FileText, 
  Phone, 
  Mail,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  User,
  LogOut,
  MessageSquare,
  Calendar,
  CreditCard,
  HelpCircle,
  Eye,
  EyeOff,
  ArrowRight,
  Download,
  Bell,
  Menu,
  X,
  Home
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Types
interface Document {
  id: string;
  name: string;
  type: 'uploaded' | 'requested' | 'report';
  date: string;
  size?: string;
  status: 'complete' | 'pending' | 'review';
}

interface Message {
  id: string;
  from: string;
  subject: string;
  preview: string;
  date: string;
  unread: boolean;
}

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string;
}

// Login Page Component
function PortalLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const heroContent = heroRef.current?.querySelector('.hero-content');
    if (heroContent) {
      gsap.fromTo(
        heroContent,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    onLogin();
  };

  return (
    <div className="min-h-screen bg-cloud">
      {/* Header */}
      <header className="bg-navy sticky top-0 z-50">
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <a href="/" className="font-heading font-bold text-lg lg:text-xl text-white">
              Solar Release Co.
            </a>
            <div className="flex items-center gap-4">
              <a href="/" className="hidden sm:flex items-center gap-2 text-white/70 hover:text-cyan transition-colors text-sm">
                <Home className="w-4 h-4" />
                Back to Website
              </a>
              <a 
                href="tel:+15551234567"
                className="flex items-center gap-2 text-white/70 hover:text-cyan transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">(555) 123-4567</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative w-full py-16 lg:py-24 overflow-hidden bg-navy"
        >
          <div className="absolute inset-0 z-0 opacity-20">
            <img
              src="/images/portal_hero.jpg"
              alt="Secure portal"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="hero-content relative z-10 px-6 lg:px-[8vw]">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Lock className="w-5 h-5 text-cyan" />
                <span className="micro-label text-cyan">SECURE ACCESS</span>
              </div>
              <h1 className="heading-xl text-white mb-6">
                SECURE CLIENT PORTAL
              </h1>
              <p className="text-white/70 text-lg lg:text-xl max-w-2xl mx-auto">
                Access your case updates, upload documents, review next steps, and stay connected with your Solar Release Co. team.
              </p>
            </div>
          </div>
        </section>

        {/* Login & Info Grid */}
        <section className="w-full py-12 lg:py-20 px-6 lg:px-[8vw] -mt-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Login Card */}
              <div className="lg:col-span-3">
                <div className="card-white p-6 lg:p-10 shadow-card">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-cyan/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-cyan" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-navy text-lg">Client Login</h2>
                      <p className="text-slate text-xs">Enter your credentials to access your case</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate/20 focus:border-cyan focus:ring-2 focus:ring-cyan/20 outline-none transition-all text-navy"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full px-4 py-3 pr-12 rounded-xl border border-slate/20 focus:border-cyan focus:ring-2 focus:ring-cyan/20 outline-none transition-all text-navy"
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate hover:text-navy transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate/30 text-cyan focus:ring-cyan" />
                        <span className="text-slate">Remember me</span>
                      </label>
                      <button type="button" className="text-cyan hover:underline">
                        Forgot Password?
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary w-full flex items-center justify-center gap-2 py-4"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          Log In
                        </>
                      )}
                    </button>
                  </form>

                  <div className="mt-6 pt-6 border-t border-slate/10 text-center">
                    <p className="text-slate text-sm mb-3">Don't have portal access yet?</p>
                    <button className="text-cyan font-medium hover:underline flex items-center justify-center gap-2 mx-auto">
                      Request Portal Access
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Info Card */}
              <div className="lg:col-span-2">
                <div className="card-white p-6 lg:p-8 h-full">
                  <h3 className="font-heading font-bold text-navy text-base mb-6">
                    WHAT YOU CAN DO INSIDE THE PORTAL
                  </h3>
                  <ul className="space-y-4">
                    {[
                      { icon: Eye, text: 'View your case status' },
                      { icon: Upload, text: 'Upload requested documents' },
                      { icon: FileText, text: 'Review your fraud report progress' },
                      { icon: ChevronRight, text: 'See next steps' },
                      { icon: MessageSquare, text: 'Contact your team' },
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-cyan/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-4 h-4 text-cyan" />
                        </div>
                        <span className="text-navy text-sm">{item.text}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-6 border-t border-slate/10">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-navy font-medium text-sm mb-1">Secure & Encrypted</p>
                        <p className="text-slate text-xs">Your information is protected with industry-standard encryption.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
              {[
                { icon: Lock, text: 'Secure access' },
                { icon: Shield, text: 'Encrypted portal' },
                { icon: FileText, text: 'Case updates in one place' },
                { icon: Upload, text: 'Easy document submission' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-slate">
                  <item.icon className="w-4 h-4 text-cyan" />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="w-full py-8 px-6 lg:px-[8vw] bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="bg-slate/5 rounded-xl p-6 flex items-start gap-4">
              <AlertCircle className="w-5 h-5 text-slate flex-shrink-0 mt-0.5" />
              <p className="text-slate text-sm leading-relaxed">
                <strong className="text-navy">Important:</strong> Solar Release Co. is a consumer advocacy organization and not a law firm. Legal services, when applicable, are provided separately by independent licensed attorneys under a direct engagement agreement.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-navy border-t border-white/10 py-8">
        <div className="w-full px-6 lg:px-[8vw]">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <a href="/" className="text-white font-heading font-bold">
              Solar Release Co.
            </a>
            <p className="text-white/50 text-sm text-center">
              Consumer advocacy organization. Not a law firm.
            </p>
            <div className="text-white/50 text-sm">
              © {new Date().getFullYear()} Solar Release Co.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Dashboard Component
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [uploadDragActive, setUploadDragActive] = useState(false);

  // Mock data
  const caseStatus = {
    currentStage: 3,
    stages: [
      { id: 1, label: 'Intake Complete', completed: true },
      { id: 2, label: 'Documents Reviewed', completed: true },
      { id: 3, label: 'Fraud Report In Progress', completed: false, current: true },
      { id: 4, label: 'Case Review', completed: false },
      { id: 5, label: 'Next Steps', completed: false },
      { id: 6, label: 'Case Resolution', completed: false },
    ],
  };

  const tasks: Task[] = [
    { id: '1', title: 'Upload latest utility bill', description: 'We need your most recent 3 months of utility statements', completed: false, dueDate: 'Due in 5 days' },
    { id: '2', title: 'Review and confirm contact information', description: 'Please verify your phone and email are correct', completed: false },
    { id: '3', title: 'Sign document release form', description: 'Required to proceed with case review', completed: true },
  ];

  const documents: Document[] = [
    { id: '1', name: 'Solar_Contract_2024.pdf', type: 'uploaded', date: 'Jan 15, 2024', size: '2.4 MB', status: 'complete' },
    { id: '2', name: 'Utility_Bill_Dec2023.pdf', type: 'uploaded', date: 'Jan 10, 2024', size: '1.1 MB', status: 'complete' },
    { id: '3', name: 'Loan_Agreement.pdf', type: 'requested', date: 'Pending', status: 'pending' },
    { id: '4', name: 'Fraud_Report_Draft.pdf', type: 'report', date: 'In Review', status: 'review' },
  ];

  const messages: Message[] = [
    { id: '1', from: 'Sarah M., Case Manager', subject: 'Documents Received', preview: 'Thank you for uploading your solar contract. We have received...', date: '2 hours ago', unread: true },
    { id: '2', from: 'Solar Release Co. Team', subject: 'Next Steps for Your Case', preview: 'Your case is progressing well. Here are the next steps we need...', date: 'Yesterday', unread: false },
    { id: '3', from: 'Document Review Team', subject: 'Additional Information Needed', preview: 'We need one more document to complete your file review...', date: '3 days ago', unread: false },
  ];

  const fraudReportProgress = [
    { label: 'Interview Complete', completed: true },
    { label: 'Contracts Reviewed', completed: true },
    { label: 'Findings Identified', completed: true },
    { label: 'Report Under Review', completed: false, current: true },
    { label: 'Ready for Case Manager', completed: false },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setUploadDragActive(true);
    } else if (e.type === 'dragleave') {
      setUploadDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setUploadDragActive(false);
    // Handle file upload logic here
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'calendar', label: 'Appointments', icon: Calendar },
    { id: 'payment', label: 'Payment', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-slate/10">
      {/* Dashboard Header */}
      <header className="bg-navy sticky top-0 z-50 shadow-lg">
        <div className="w-full px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Mobile Menu */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-white/70 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <a href="/" className="font-heading font-bold text-lg text-white">
                Solar Release Co.
              </a>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === item.id
                      ? 'bg-cyan/20 text-cyan'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-white/70 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-cyan rounded-full" />
              </button>
              <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-white/20">
                <div className="w-8 h-8 rounded-full bg-cyan/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-cyan" />
                </div>
                <div className="text-left">
                  <p className="text-white text-sm font-medium">John Smith</p>
                  <p className="text-white/50 text-xs">Case #SRC-2024-1847</p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-white/70 hover:text-white transition-colors"
                title="Log Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-navy border-t border-white/10">
            <nav className="p-4 space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                    activeTab === item.id
                      ? 'bg-cyan/20 text-cyan'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Banner */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="heading-lg text-navy mb-1">
                  Welcome back, John
                </h1>
                <p className="text-slate">
                  Last updated: <span className="text-navy font-medium">Today at 2:34 PM</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-4 py-2 bg-cyan/10 text-cyan rounded-full text-sm font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  In Progress
                </span>
                <a 
                  href="tel:+15551234567"
                  className="btn-primary flex items-center gap-2 text-sm py-2.5 px-4"
                >
                  <Phone className="w-4 h-4" />
                  <span className="hidden sm:inline">Call Support</span>
                </a>
              </div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Main Cards */}
            <div className="lg:col-span-2 space-y-6">
              {/* Case Status Tracker */}
              <div className="card-white p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-cyan" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-navy">Your Case Status</h2>
                      <p className="text-slate text-sm">Track your case progress</p>
                    </div>
                  </div>
                  <span className="text-cyan text-sm font-medium">Step 3 of 6</span>
                </div>

                {/* Progress Bar */}
                <div className="relative mb-8">
                  <div className="h-2 bg-slate/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan to-cyan/70 rounded-full transition-all duration-500"
                      style={{ width: '50%' }}
                    />
                  </div>
                </div>

                {/* Stage Timeline */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {caseStatus.stages.map((stage) => (
                    <div key={stage.id} className="text-center">
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${
                          stage.completed 
                            ? 'bg-cyan text-white' 
                            : stage.current 
                              ? 'bg-cyan/20 text-cyan border-2 border-cyan' 
                              : 'bg-slate/10 text-slate'
                        }`}
                      >
                        {stage.completed ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <span className="text-sm font-bold">{stage.id}</span>
                        )}
                      </div>
                      <p className={`text-xs leading-tight ${stage.current ? 'text-cyan font-medium' : 'text-slate'}`}>
                        {stage.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              <div className="card-white p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan/10 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-cyan" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-navy">Next Steps</h2>
                      <p className="text-slate text-sm">Action items for your case</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-amber/10 text-amber rounded-full text-xs font-medium">
                    2 pending
                  </span>
                </div>

                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div 
                      key={task.id}
                      className={`flex items-start gap-4 p-4 rounded-xl border ${
                        task.completed 
                          ? 'bg-slate/5 border-slate/10' 
                          : 'bg-white border-slate/20 hover:border-cyan/30 transition-colors'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        task.completed ? 'bg-cyan text-white' : 'border-2 border-slate/30'
                      }`}>
                        {task.completed && <CheckCircle className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium text-sm mb-1 ${task.completed ? 'text-slate line-through' : 'text-navy'}`}>
                          {task.title}
                        </h4>
                        <p className="text-slate text-xs mb-2">{task.description}</p>
                        {task.dueDate && !task.completed && (
                          <span className="text-amber text-xs flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {task.dueDate}
                          </span>
                        )}
                      </div>
                      {!task.completed && (
                        <button className="btn-primary text-xs py-2 px-4">
                          {task.title.includes('Upload') ? 'Upload' : 'Complete'}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Document Center */}
              <div className="card-white p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-cyan" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-navy">Documents</h2>
                      <p className="text-slate text-sm">Manage your case files</p>
                    </div>
                  </div>
                  <button className="text-cyan text-sm font-medium hover:underline flex items-center gap-1">
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Upload Area */}
                <div 
                  className={`border-2 border-dashed rounded-xl p-8 text-center mb-6 transition-colors ${
                    uploadDragActive ? 'border-cyan bg-cyan/5' : 'border-slate/20 hover:border-cyan/30'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="w-12 h-12 rounded-full bg-cyan/10 flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-6 h-6 text-cyan" />
                  </div>
                  <p className="text-navy font-medium text-sm mb-1">
                    Drag and drop files here, or click to browse
                  </p>
                  <p className="text-slate text-xs">
                    Supports PDF, JPG, PNG up to 10MB
                  </p>
                </div>

                {/* Document List */}
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div 
                      key={doc.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-slate/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          doc.type === 'report' ? 'bg-cyan/10' : 'bg-slate/10'
                        }`}>
                          <FileText className={`w-5 h-5 ${doc.type === 'report' ? 'text-cyan' : 'text-slate'}`} />
                        </div>
                        <div>
                          <p className="text-navy text-sm font-medium">{doc.name}</p>
                          <p className="text-slate text-xs">
                            {doc.date} {doc.size && `• ${doc.size}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {doc.status === 'pending' && (
                          <span className="px-2 py-1 bg-amber/10 text-amber rounded text-xs">
                            Needed
                          </span>
                        )}
                        {doc.status === 'review' && (
                          <span className="px-2 py-1 bg-cyan/10 text-cyan rounded text-xs">
                            In Review
                          </span>
                        )}
                        <button className="p-2 text-slate hover:text-cyan transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Side Cards */}
            <div className="space-y-6">
              {/* Fraud Report Progress */}
              <div className="card-white p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-cyan/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-cyan" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-navy text-sm">Fraud Report Progress</h2>
                  </div>
                </div>

                <div className="space-y-3">
                  {fraudReportProgress.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        item.completed 
                          ? 'bg-cyan text-white' 
                          : item.current 
                            ? 'border-2 border-cyan text-cyan' 
                            : 'border-2 border-slate/20 text-slate'
                      }`}>
                        {item.completed && <CheckCircle className="w-3 h-3" />}
                      </div>
                      <span className={`text-sm ${item.completed ? 'text-navy' : item.current ? 'text-cyan font-medium' : 'text-slate'}`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-5 border-t border-slate/10">
                  <div className="bg-cyan/5 rounded-lg p-4">
                    <p className="text-cyan text-sm font-medium mb-1">Report Status</p>
                    <p className="text-navy text-xs">Under review by case management team. Expected completion: 3-5 business days.</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="card-white p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan/10 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-cyan" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-navy text-sm">Messages</h2>
                    </div>
                  </div>
                  {messages.some(m => m.unread) && (
                    <span className="px-2 py-1 bg-cyan text-white rounded-full text-xs font-medium">
                      {messages.filter(m => m.unread).length} new
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  {messages.slice(0, 3).map((message) => (
                    <div 
                      key={message.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        message.unread ? 'bg-cyan/5 hover:bg-cyan/10' : 'hover:bg-slate/5'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <p className={`text-sm ${message.unread ? 'font-medium text-navy' : 'text-slate'}`}>
                          {message.from}
                        </p>
                        <span className="text-xs text-slate">{message.date}</span>
                      </div>
                      <p className="text-navy text-sm font-medium mb-1">{message.subject}</p>
                      <p className="text-slate text-xs line-clamp-2">{message.preview}</p>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 py-3 text-cyan text-sm font-medium hover:bg-cyan/5 rounded-lg transition-colors">
                  View All Messages
                </button>
              </div>

              {/* Support Card */}
              <div className="card-white p-6 bg-navy">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-cyan/20 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-cyan" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-white text-sm">Need Help?</h2>
                  </div>
                </div>

                <div className="space-y-4">
                  <a 
                    href="tel:+15551234567"
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-cyan" />
                    <div>
                      <p className="text-white text-sm font-medium">Call Client Care</p>
                      <p className="text-white/50 text-xs">(555) 123-4567</p>
                    </div>
                  </a>

                  <a 
                    href="mailto:support@solarrelease.co"
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-cyan" />
                    <div>
                      <p className="text-white text-sm font-medium">Email Client Care</p>
                      <p className="text-white/50 text-xs">support@solarrelease.co</p>
                    </div>
                  </a>
                </div>

                <div className="mt-5 pt-5 border-t border-white/10">
                  <p className="text-white/50 text-xs flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Mon–Fri, 9am–6pm EST
                  </p>
                </div>
              </div>

              {/* Case Review Path */}
              <div className="card-white p-6 border-2 border-cyan/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-cyan/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-cyan" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-navy text-sm">Case Review Path</h2>
                  </div>
                </div>

                <p className="text-slate text-sm leading-relaxed mb-4">
                  If your case qualifies for escalation, your documentation may be reviewed by independent legal partners under a separate process.
                </p>

                <div className="bg-slate/5 rounded-lg p-4">
                  <p className="text-xs text-slate">
                    <AlertCircle className="w-4 h-4 inline-block mr-1 text-cyan" />
                    Legal services, when applicable, are provided separately by independent licensed attorneys.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Help Button */}
      <a 
        href="tel:+15551234567"
        className="fixed bottom-4 right-4 lg:hidden z-50 w-14 h-14 bg-cyan rounded-full flex items-center justify-center shadow-lg"
      >
        <Phone className="w-6 h-6 text-navy" />
      </a>
    </div>
  );
}

// Main Portal Component
export default function Portal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return isAuthenticated ? (
    <Dashboard onLogout={() => setIsAuthenticated(false)} />
  ) : (
    <PortalLogin onLogin={() => setIsAuthenticated(true)} />
  );
}