// ===== STUDY MODE PREMIUM - BLACK EDITION =====
// Advanced Cognitive Focus Tool with Psychology & Analytics

'use strict';

// ===== GLOBAL STATE =====
const NeuralState = {
    // Timer System
    timerActive: false,
    timerMode: 'pomodoro', // 'pomodoro', 'stopwatch', 'custom'
    focusDuration: 25 * 60,
    breakDuration: 5 * 60,
    currentTime: 25 * 60,
    timerInterval: null,
    
    // Activity System
    currentActivity: 'study',
    customActivities: [],
    
    // User Configuration
    language: 'en',
    deviceType: 'desktop',
    
    // Psychology Engine
    psychology: {
        commitment: true,
        flowProtection: true,
        egoTrigger: true,
        delayedReward: true,
        temporalAnchor: false,
        endStateVision: false,
        antiBinge: true,
        silentAccountability: true,
        cognitiveWarmup: true,
        lossAversion: true
    },
    
    // Performance Analytics
    analytics: {
        totalSessions: 0,
        totalMinutes: 0,
        currentStreak: 0,
        longestStreak: 0,
        productivityScore: 87,
        focusPeakHours: '14:00-16:00',
        averageSession: 25,
        dailyGoal: 4,
        todaySessions: 0
    },
    
    // Neural Messages Database
    neuralMessages: {
        en: {
            startup: [
                "Neural pathways activating. Prepare for deep focus.",
                "Cognitive engine engaged. Maximum output enabled.",
                "Entering flow state. External distractions minimized.",
                "Brainwave optimization in progress. Focus at peak levels.",
                "Neuro-performance mode activated. Prepare for elite concentration."
            ],
            focus: [
                "You're in the zone. Don't break the neural flow!",
                "Every second builds your cognitive dominance. Stay locked in!",
                "This is what champions do. Absolute focus. No compromises!",
                "Your brain is firing on all cylinders. Keep the momentum!",
                "Pressure creates diamonds. You're becoming unbreakable!"
            ],
            arabic: [
                "المسارات العصبية بتتفعل. استعد للتركيز العميق.",
                "المحرك الإدراكي اشتغل. أقصى انتاجية متاحة.",
                "دخّلت حالة التدفق. المشتتات الخارجية اتمنعت.",
                "تحسين موجات المخ شغال. التركيز في أعلى مستوى.",
                "مود الأداء العصبي اتعمل. استعد للتركيز النخبوي."
            ],
            motivation: [
                "The pain of discipline weighs ounces. Regret weighs tons.",
                "Future you is watching. Make them proud.",
                "Excuses don't build empires. Focus does.",
                "One more minute. One more victory.",
                "They'll know your name. Earn it here."
            ]
        },
        ar: {
            startup: [
                "المسارات العصبية بتتفعل. استعد للتركيز العميق.",
                "المحرك الإدراكي اشتغل. أقصى انتاجية متاحة.",
                "دخّلت حالة التدفق. المشتتات الخارجية اتمنعت.",
                "تحسين موجات المخ شغال. التركيز في أعلى مستوى.",
                "مود الأداء العصبي اتعمل. استعد للتركيز النخبوي."
            ],
            focus: [
                "انت في المنطقة. متكسرش التدفق العصبي!",
                "كل ثانية بتبني سيطرتك الإدراكية. فضل قفلان!",
                "دي حاجة الأبطال بيعملوها. تركيز مطلق. من غير مساومة!",
                "مخك شغال بأقصى طاقة. استمر في الزخم!",
                "الضغط بيعمل الماس. انت بتبقى صعب الانكسار!"
            ],
            arabic: [
                "المسارات العصبية بتتفعل. استعد للتركيز العميق.",
                "المحرك الإدراكي اشتغل. أقصى انتاجية متاحة.",
                "دخّلت حالة التدفق. المشتتات الخارجية اتمنعت.",
                "تحسين موجات المخ شغال. التركيز في أعلى مستوى.",
                "مود الأداء العصبي اتعمل. استعد للتركيز النخبوي."
            ],
            motivation: [
                "وجع الانضباط خفيف. الندم تقيل.",
                "نفسك في المستقبل شايفاك. خليها تفخر بيك.",
                "الأعذار مش بتبني إمبراطوريات. التركيز هو اللي بيبني.",
                "دقيقة زيادة. انتصار زيادة.",
                "هيعرفوا اسمك. اكسبه هنا."
            ]
        }
    },
    
    // User Identity
    userName: 'Champion',
    userLevel: 1,
    userXP: 0,
    
    // Session Tracking
    currentSession: {
        startTime: null,
        activity: null,
        duration: 0,
        interruptions: 0,
        focusScore: 0
    }
};

// ===== DOM ELEMENTS =====
const neuralDOM = {
    // Modals
    welcomeModal: document.getElementById('welcomeModal'),
    statsModal: document.getElementById('statsModal'),
    customTimerModal: document.getElementById('customTimerModal'),
    
    // Timer Elements
    timerDisplay: document.getElementById('timerDisplay'),
    minutesDisplay: document.querySelector('.minutes'),
    secondsDisplay: document.querySelector('.seconds'),
    progressCircle: document.querySelector('.progress-ring__circle'),
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),
    progressTextAr: document.getElementById('progressTextAr'),
    
    // Buttons
    enterBtn: document.getElementById('enterBtn'),
    cancelBtn: document.getElementById('cancelBtn'),
    startBtn: document.getElementById('startBtn'),
    pauseBtn: document.getElementById('pauseBtn'),
    resetBtn: document.getElementById('resetBtn'),
    fullscreenBtn: document.getElementById('fullscreenBtn'),
    statsBtn: document.getElementById('statsBtn'),
    nextMsgBtn: document.getElementById('nextMsgBtn'),
    quickStartBtn: document.getElementById('quickStartBtn'),
    deepFocusBtn: document.getElementById('deepFocusBtn'),
    quickBreakBtn: document.getElementById('quickBreakBtn'),
    focusMusicBtn: document.getElementById('focusMusicBtn'),
    
    // Mode Selectors
    modeButtons: document.querySelectorAll('.mode-btn'),
    
    // Activities
    activityCards: document.querySelectorAll('.activity-card'),
    customActivityPanel: document.getElementById('customActivityPanel'),
    customActivityInput: document.getElementById('customActivityInput'),
    customDuration: document.getElementById('customDuration'),
    saveCustomBtn: document.getElementById('saveCustomBtn'),
    
    // Psychology Boosters
    boosterCards: document.querySelectorAll('.booster-card'),
    boosterToggles: document.querySelectorAll('.booster-toggle input'),
    activeBoosters: document.getElementById('activeBoosters'),
    
    // Language
    langButtons: document.querySelectorAll('.lang-btn'),
    
    // Messages
    englishMessage: document.getElementById('englishMessage'),
    arabicMessage: document.getElementById('arabicMessage'),
    
    // Stats Display
    streakCounter: document.getElementById('streakCounter'),
    focusScore: document.getElementById('focusScore'),
    totalSessionTime: document.getElementById('totalSessionTime'),
    completedSessions: document.getElementById('completedSessions'),
    focusLevel: document.getElementById('focusLevel'),
    footerSessions: document.getElementById('footerSessions'),
    footerHours: document.getElementById('footerHours'),
    footerProductivity: document.getElementById('footerProductivity'),
    
    // Timer Mode Labels
    timerModeLabel: document.getElementById('timerModeLabel'),
    timerModeLabelAr: document.getElementById('timerModeLabelAr')
};

// ===== INITIALIZATION =====
function neuralInit() {
    console.log('⚡ Neural Focus System Initializing...');
    
    // Detect environment
    detectNeuralEnvironment();
    
    // Load brain state
    loadNeuralState();
    
    // Setup neural connections
    setupNeuralConnections();
    
    // Initialize neural interface
    initializeNeuralInterface();
    
    // Start cognitive engine
    startCognitiveEngine();
    
    console.log('🧠 Neural System Ready');
}

// ===== ENVIRONMENT DETECTION =====
function detectNeuralEnvironment() {
    const userAgent = navigator.userAgent;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
    const isTablet = /iPad|Tablet|PlayBook|Silk/i.test(userAgent);
    
    if (isTablet) {
        NeuralState.deviceType = 'tablet';
    } else if (isMobile) {
        NeuralState.deviceType = 'mobile';
    } else {
        NeuralState.deviceType = 'desktop';
    }
    
    // Add device class
    document.body.classList.add(`neural-${NeuralState.deviceType}`);
    
    // Mobile optimizations
    if (isMobile || isTablet) {
        document.body.classList.add('touch-optimized');
    }
}

// ===== STATE MANAGEMENT =====
function loadNeuralState() {
    const saved = localStorage.getItem('neuralFocus_state');
    if (saved) {
        try {
            const state = JSON.parse(saved);
            
            // Merge with defaults
            Object.assign(NeuralState, state);
            
            // Validate psychology object
            if (!state.psychology) {
                NeuralState.psychology = {
                    commitment: true,
                    flowProtection: true,
                    egoTrigger: true,
                    delayedReward: true,
                    temporalAnchor: false,
                    endStateVision: false,
                    antiBinge: true,
                    silentAccountability: true,
                    cognitiveWarmup: true,
                    lossAversion: true
                };
            }
            
            // Update timer
            NeuralState.currentTime = NeuralState.timerMode === 'pomodoro' 
                ? NeuralState.focusDuration 
                : 0;
                
            console.log('🧠 Neural State Loaded');
        } catch (error) {
            console.error('❌ Neural State Corruption:', error);
            // Create default neural imprint
            createDefaultNeuralImprint();
        }
    } else {
        createDefaultNeuralImprint();
    }
}

function createDefaultNeuralImprint() {
    // First time user experience
    NeuralState.analytics.totalSessions = 0;
    NeuralState.analytics.totalMinutes = 0;
    NeuralState.analytics.currentStreak = 0;
    NeuralState.analytics.longestStreak = 0;
    NeuralState.analytics.productivityScore = 87;
    NeuralState.analytics.focusPeakHours = '14:00-16:00';
    NeuralState.analytics.averageSession = 25;
    NeuralState.analytics.dailyGoal = 4;
    NeuralState.analytics.todaySessions = 0;
    
    // Welcome sequence
    setTimeout(() => {
        showNeuralMessage('welcome');
    }, 1000);
}

function saveNeuralState() {
    try {
        const state = {
            language: NeuralState.language,
            currentActivity: NeuralState.currentActivity,
            customActivities: NeuralState.customActivities,
            psychology: NeuralState.psychology,
            analytics: NeuralState.analytics,
            focusDuration: NeuralState.focusDuration,
            breakDuration: NeuralState.breakDuration,
            timerMode: NeuralState.timerMode,
            deviceType: NeuralState.deviceType,
            userName: NeuralState.userName,
            userLevel: NeuralState.userLevel,
            userXP: NeuralState.userXP
        };
        
        localStorage.setItem('neuralFocus_state', JSON.stringify(state));
        console.log('💾 Neural State Saved');
    } catch (error) {
        console.error('❌ Save Failed:', error);
    }
}

// ===== NEURAL INTERFACE =====
function initializeNeuralInterface() {
    // Set language
    switchNeuralLanguage(NeuralState.language);
    
    // Update activity selection
    selectNeuralActivity(NeuralState.currentActivity);
    
    // Update timer display
    updateNeuralTimer();
    
    // Update all stats
    updateNeuralStats();
    
    // Update psychology boosters
    updatePsychologyBoosters();
    
    // Show initial message
    showNeuralMessage('startup');
    
    // Create particle background
    createNeuralParticles();
}

function updateNeuralTimer() {
    const minutes = Math.floor(NeuralState.currentTime / 60);
    const seconds = NeuralState.currentTime % 60;
    
    neuralDOM.minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    neuralDOM.secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update progress
    updateNeuralProgress();
}

function updateNeuralProgress() {
    const totalTime = NeuralState.timerMode === 'pomodoro' 
        ? NeuralState.focusDuration 
        : (NeuralState.timerMode === 'custom' ? NeuralState.focusDuration : 3600);
    
    const percentage = (NeuralState.currentTime / totalTime) * 100;
    const circumference = 2 * Math.PI * 180;
    const offset = circumference - (percentage / 100) * circumference;
    
    // Update circle progress
    neuralDOM.progressCircle.style.strokeDashoffset = offset;
    
    // Update bar progress
    neuralDOM.progressFill.style.width = `${100 - percentage}%`;
    
    // Update progress text
    const remainingText = `${Math.floor(NeuralState.currentTime / 60)}:${(NeuralState.currentTime % 60).toString().padStart(2, '0')} remaining`;
    const remainingTextAr = `${Math.floor(NeuralState.currentTime / 60)}:${(NeuralState.currentTime % 60).toString().padStart(2, '0')} باقي`;
    
    neuralDOM.progressText.textContent = remainingText;
    neuralDOM.progressTextAr.textContent = remainingTextAr;
}

function updateNeuralStats() {
    // Update streak
    neuralDOM.streakCounter.textContent = NeuralState.analytics.currentStreak;
    
    // Update focus score
    neuralDOM.focusScore.textContent = `${NeuralState.analytics.productivityScore}%`;
    updateScoreCircle(NeuralState.analytics.productivityScore);
    
    // Update session stats
    neuralDOM.totalSessionTime.textContent = `${Math.floor(NeuralState.analytics.totalMinutes / 60)}h`;
    neuralDOM.completedSessions.textContent = NeuralState.analytics.totalSessions;
    neuralDOM.focusLevel.textContent = `Lvl ${NeuralState.userLevel}`;
    
    // Update footer stats
    neuralDOM.footerSessions.textContent = NeuralState.analytics.totalSessions;
    neuralDOM.footerHours.textContent = Math.floor(NeuralState.analytics.totalMinutes / 60);
    neuralDOM.footerProductivity.textContent = `${NeuralState.analytics.productivityScore}%`;
    
    // Update active boosters
    const activeCount = Object.values(NeuralState.psychology).filter(v => v).length;
    neuralDOM.activeBoosters.textContent = activeCount;
}

function updateScoreCircle(score) {
    const circle = document.querySelector('.score-progress');
    if (circle) {
        const circumference = 2 * Math.PI * 28;
        const offset = circumference - (score / 100) * circumference;
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = offset;
    }
}

// ===== PSYCHOLOGY ENGINE =====
function activatePsychologyEngine() {
    console.log('🧪 Psychology Engine Activated');
    
    // Commitment Bias
    if (NeuralState.psychology.commitment) {
        activateCommitmentBias();
    }
    
    // Loss Aversion
    if (NeuralState.psychology.lossAversion) {
        activateLossAversion();
    }
    
    // Flow Protection
    if (NeuralState.psychology.flowProtection) {
        activateFlowProtection();
    }
    
    // Ego Trigger
    if (NeuralState.psychology.egoTrigger) {
        activateEgoTrigger();
    }
    
    // Delayed Reward
    if (NeuralState.psychology.delayedReward) {
        activateDelayedReward();
    }
    
    // Cognitive Warm-up
    if (NeuralState.psychology.cognitiveWarmup) {
        activateCognitiveWarmup();
    }
}

function activateCommitmentBias() {
    // Public commitment effect
    const commitmentMessages = NeuralState.language === 'ar' 
        ? ["انت وافقت! مينفعش تتراجع دلوقتي!", "التزامك ده هيخلق شخصية جديدة!"]
        : ["You committed! No turning back now!", "This commitment is forging a new you!"];
    
    // Show commitment message
    if (NeuralState.timerActive && Math.random() < 0.05) {
        showCustomNeuralMessage(commitmentMessages[Math.floor(Math.random() * commitmentMessages.length)]);
    }
}

function activateLossAversion() {
    // Fear of loss motivation
    if (NeuralState.timerActive && NeuralState.currentTime > 300) { // After 5 minutes
        const minutesInvested = Math.floor(NeuralState.currentTime / 60);
        const potentialLoss = NeuralState.language === 'ar'
            ? `هتخسر ${minutesInvested} دقيقة من تركيزك لو وقفت دلوقتي!`
            : `You'll lose ${minutesInvested} minutes of focus if you stop now!`;
        
        if (Math.random() < 0.03) {
            showCustomNeuralMessage(potentialLoss);
        }
    }
}

function activateFlowProtection() {
    // Protect from distractions
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && NeuralState.timerActive) {
            // User switched tabs
            NeuralState.currentSession.interruptions++;
            
            const warning = NeuralState.language === 'ar'
                ? "حذر! كسرت التدفق. رجّع التركيز دلوقتي!"
                : "Alert! Flow broken. Return to focus immediately!";
            
            showCustomNeuralMessage(warning);
            
            // Track for analytics
            if (NeuralState.psychology.silentAccountability) {
                updateProductivityScore(-5);
            }
        }
    });
    
    // Prevent accidental exit
    window.addEventListener('beforeunload', (e) => {
        if (NeuralState.timerActive) {
            e.preventDefault();
            e.returnValue = '';
            
            // Show exit prevention modal
            showExitProtection();
            return false;
        }
    });
}

function activateEgoTrigger() {
    // Boost self-image
    const egoBoosters = NeuralState.language === 'ar'
        ? ["انت اسطورة التركيز! محدش في مستواك!", "عقل جامد! استمر في التفجير!", "انت من نوعية النخبة! برهان دلوقتي!"]
        : ["You're a focus legend! No one is on your level!", "Mental beast! Keep crushing it!", "You're elite material! Prove it now!"];
    
    if (NeuralState.timerActive && NeuralState.currentTime % 180 === 0) { // Every 3 minutes
        const boost = egoBoosters[Math.floor(Math.random() * egoBoosters.length)];
        showCustomNeuralMessage(boost);
        
        // Visual ego boost
        document.body.classList.add('ego-boost');
        setTimeout(() => {
            document.body.classList.remove('ego-boost');
        }, 1000);
    }
}

function activateDelayedReward() {
    // Only show rewards after completion
    // This happens in completeSession()
}

function activateCognitiveWarmup() {
    // Mental preparation
    if (!NeuralState.timerActive) {
        const warmupQuestions = NeuralState.language === 'ar'
            ? ["ايه الهدف النهائي اللي عايز توصله؟", "هتكون مين بعد ما تنجح في ده؟"]
            : ["What's the ultimate goal you're working toward?", "Who will you become after mastering this?"];
        
        if (Math.random() < 0.1) {
            const question = warmupQuestions[Math.floor(Math.random() * warmupQuestions.length)];
            showCustomNeuralMessage(question);
        }
    }
}

function updatePsychologyBoosters() {
    // Update toggle states
    neuralDOM.boosterToggles.forEach(toggle => {
        const booster = toggle.closest('.booster-card').dataset.booster;
        toggle.checked = NeuralState.psychology[booster] || false;
        
        // Update card state
        const card = toggle.closest('.booster-card');
        if (toggle.checked) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
    
    // Update active count
    const activeCount = Object.values(NeuralState.psychology).filter(v => v).length;
    neuralDOM.activeBoosters.textContent = activeCount;
}

// ===== TIMER SYSTEM =====
function startNeuralTimer() {
    if (NeuralState.timerActive) return;
    
    console.log('⏱️ Neural Timer Activated');
    
    NeuralState.timerActive = true;
    neuralDOM.startBtn.disabled = true;
    neuralDOM.pauseBtn.disabled = false;
    
    // Start session tracking
    NeuralState.currentSession = {
        startTime: new Date(),
        activity: NeuralState.currentActivity,
        duration: 0,
        interruptions: 0,
        focusScore: 100
    };
    
    // Calculate end time
    const totalDuration = NeuralState.timerMode === 'pomodoro' 
        ? NeuralState.focusDuration 
        : (NeuralState.timerMode === 'custom' ? NeuralState.focusDuration : 0);
    
    const endTime = Date.now() + (totalDuration * 1000);
    
    // Start interval
    NeuralState.timerInterval = setInterval(() => {
        if (NeuralState.timerMode === 'stopwatch') {
            NeuralState.currentTime++;
        } else {
            const now = Date.now();
            const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
            NeuralState.currentTime = remaining;
            
            if (remaining === 0) {
                completeNeuralSession();
                return;
            }
        }
        
        updateNeuralTimer();
        
        // Psychology triggers
        if (NeuralState.timerActive) {
            triggerPsychologyEvents();
        }
        
        // Update session duration
        if (NeuralState.currentSession) {
            NeuralState.currentSession.duration++;
        }
        
    }, 1000);
    
    // Activate psychology engine
    activatePsychologyEngine();
    
    // Show start message
    showNeuralMessage('focus');
    
    // Visual effects
    document.body.classList.add('timer-active');
    
    // Play start sound (conceptual)
    playNeuralSound('start');
}

function pauseNeuralTimer() {
    if (!NeuralState.timerActive) return;
    
    console.log('⏸️ Neural Timer Paused');
    
    NeuralState.timerActive = false;
    clearInterval(NeuralState.timerInterval);
    NeuralState.timerInterval = null;
    
    neuralDOM.startBtn.disabled = false;
    neuralDOM.pauseBtn.disabled = true;
    
    // Psychology: Loss Aversion trigger
    if (NeuralState.psychology.lossAversion) {
        const minutesLost = Math.floor(NeuralState.currentSession.duration / 60);
        const message = NeuralState.language === 'ar'
            ? `خسرت ${minutesLost} دقيقة من التركيز!`
            : `You lost ${minutesLost} minutes of focus!`;
        
        showCustomNeuralMessage(message);
    }
    
    // Visual effects
    document.body.classList.remove('timer-active');
    document.body.classList.add('timer-paused');
    setTimeout(() => {
        document.body.classList.remove('timer-paused');
    }, 1000);
}

function resetNeuralTimer() {
    if (NeuralState.timerActive) {
        const confirmMessage = NeuralState.language === 'ar'
            ? "انت متأكد انك عايز تعيد الجلسة؟ كل التقدم هيتحسب!"
            : "Are you sure you want to reset the session? All progress will be lost!";
        
        if (!confirm(confirmMessage)) return;
    }
    
    console.log('🔄 Neural Timer Reset');
    
    // Clear interval
    if (NeuralState.timerInterval) {
        clearInterval(NeuralState.timerInterval);
        NeuralState.timerInterval = null;
    }
    
    // Reset state
    NeuralState.timerActive = false;
    NeuralState.currentTime = NeuralState.timerMode === 'pomodoro' 
        ? NeuralState.focusDuration 
        : (NeuralState.timerMode === 'custom' ? NeuralState.focusDuration : 0);
    
    // Reset UI
    neuralDOM.startBtn.disabled = false;
    neuralDOM.pauseBtn.disabled = true;
    
    updateNeuralTimer();
    
    // Show reset message
    const resetMessage = NeuralState.language === 'ar'
        ? "التايمر اتعاد. جهّز نفسك للجولة الجديدة!"
        : "Timer reset. Prepare for the next round!";
    
    showCustomNeuralMessage(resetMessage);
    
    // Visual reset
    document.body.classList.remove('timer-active');
}

function completeNeuralSession() {
    console.log('🎯 Neural Session Complete');
    
    clearInterval(NeuralState.timerInterval);
    NeuralState.timerInterval = null;
    NeuralState.timerActive = false;
    
    // Update analytics
    NeuralState.analytics.totalSessions++;
    NeuralState.analytics.totalMinutes += NeuralState.currentSession.duration / 60;
    NeuralState.analytics.todaySessions++;
    
    // Update streak
    updateNeuralStreak();
    
    // Calculate focus score for session
    calculateSessionFocusScore();
    
    // Level up system
    updateUserLevel();
    
    // Save state
    saveNeuralState();
    
    // Update UI
    neuralDOM.startBtn.disabled = false;
    neuralDOM.pauseBtn.disabled = true;
    updateNeuralStats();
    
    // Psychology: Delayed Reward
    if (NeuralState.psychology.delayedReward) {
        revealNeuralReward();
    }
    
    // Psychology: End-State Visualization
    if (NeuralState.psychology.endStateVision) {
        visualizeEndState();
    }
    
    // Show completion message
    showNeuralMessage('completion');
    
    // Celebration effects
    triggerNeuralCelebration();
    
    // Play completion sound
    playNeuralSound('complete');
}

function updateNeuralStreak() {
    const today = new Date().toDateString();
    const lastSession = localStorage.getItem('neuralLastSession');
    
    if (lastSession === today) {
        // Already counted today
        return;
    }
    
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (lastSession === yesterday) {
        // Consecutive day
        NeuralState.analytics.currentStreak++;
    } else {
        // New streak
        NeuralState.analytics.currentStreak = 1;
    }
    
    // Update longest streak
    if (NeuralState.analytics.currentStreak > NeuralState.analytics.longestStreak) {
        NeuralState.analytics.longestStreak = NeuralState.analytics.currentStreak;
    }
    
    // Save today's session
    localStorage.setItem('neuralLastSession', today);
}

function calculateSessionFocusScore() {
    let score = 100;
    
    // Deduct for interruptions
    score -= NeuralState.currentSession.interruptions * 5;
    
    // Deduct for short sessions
    if (NeuralState.currentSession.duration < 300) { // Less than 5 minutes
        score -= 20;
    }
    
    // Ensure score is between 0-100
    score = Math.max(0, Math.min(100, score));
    
    // Update analytics
    NeuralState.analytics.productivityScore = Math.round(
        (NeuralState.analytics.productivityScore * 0.7) + (score * 0.3)
    );
    
    NeuralState.currentSession.focusScore = score;
}

function updateUserLevel() {
    const xpPerSession = 10 + (NeuralState.currentSession.focusScore / 10);
    NeuralState.userXP += xpPerSession;
    
    const xpForNextLevel = NeuralState.userLevel * 100;
    if (NeuralState.userXP >= xpForNextLevel) {
        NeuralState.userLevel++;
        NeuralState.userXP = NeuralState.userXP - xpForNextLevel;
        
        // Level up celebration
        triggerLevelUp();
    }
}

// ===== MESSAGES SYSTEM =====
function showNeuralMessage(type = 'startup') {
    const messages = NeuralState.neuralMessages[NeuralState.language][type] || 
                    NeuralState.neuralMessages[NeuralState.language].startup;
    
    const messageIndex = Math.floor(Math.random() * messages.length);
    const message = messages[messageIndex];
    
    // Get corresponding message in other language
    const otherLang = NeuralState.language === 'en' ? 'ar' : 'en';
    const otherMessages = NeuralState.neuralMessages[otherLang][type] || 
                         NeuralState.neuralMessages[otherLang].startup;
    const otherMessage = otherMessages[messageIndex] || otherMessages[0];
    
    if (NeuralState.language === 'ar') {
        neuralDOM.arabicMessage.textContent = message;
        neuralDOM.englishMessage.textContent = otherMessage;
    } else {
        neuralDOM.englishMessage.textContent = message;
        neuralDOM.arabicMessage.textContent = otherMessage;
    }
    
    // Animation
    animateMessage();
}

function showCustomNeuralMessage(message) {
    const otherLang = NeuralState.language === 'en' ? 'ar' : 'en';
    const otherMessage = NeuralState.language === 'ar' 
        ? "Focus message activated"
        : "تم تفعيل رسالة التركيز";
    
    if (NeuralState.language === 'ar') {
        neuralDOM.arabicMessage.textContent = message;
        neuralDOM.englishMessage.textContent = otherMessage;
    } else {
        neuralDOM.englishMessage.textContent = message;
        neuralDOM.arabicMessage.textContent = otherMessage;
    }
    
    // Animation
    animateMessage();
}

function animateMessage() {
    const messageCard = document.querySelector('.message-card');
    messageCard.style.animation = 'none';
    setTimeout(() => {
        messageCard.style.animation = 'slideInUp 0.5s ease';
    }, 10);
}

// ===== ACTIVITY SYSTEM =====
function selectNeuralActivity(activity) {
    NeuralState.currentActivity = activity;
    
    // Update UI
    neuralDOM.activityCards.forEach(card => {
        if (card.dataset.activity === activity) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
    
    // Show custom panel if needed
    if (activity === 'custom') {
        neuralDOM.customActivityPanel.classList.add('active');
    } else {
        neuralDOM.customActivityPanel.classList.remove('active');
    }
    
    // Update timer mode label
    updateTimerModeLabel();
    
    // Psychology: Identity reinforcement
    reinforceNeuralIdentity();
    
    // Save state
    saveNeuralState();
}

function updateTimerModeLabel() {
    const labels = {
        en: {
            study: "DEEP STUDY",
            coding: "CODE FLOW",
            workout: "POWER TRAINING",
            meditation: "MIND SPACE",
            creative: "CREATIVE FLOW",
            custom: "CUSTOM MISSION"
        },
        ar: {
            study: "مذاكرة عميقة",
            coding: "تدفق البرمجة",
            workout: "تدريب القوة",
            meditation: "فضاء العقل",
            creative: "التدفق الإبداعي",
            custom: "مهمة مخصصة"
        }
    };
    
    neuralDOM.timerModeLabel.textContent = labels.en[NeuralState.currentActivity];
    neuralDOM.timerModeLabelAr.textContent = labels.ar[NeuralState.currentActivity];
}

function reinforceNeuralIdentity() {
    const identities = NeuralState.language === 'ar'
        ? ["انت دلوقتي في مود التركيز المتقدم!", "شخصيتك الجديدة: بطل تركيز!"]
        : ["You are now in Advanced Focus Mode!", "Your new identity: Focus Champion!"];
    
    if (Math.random() < 0.3) {
        const identity = identities[Math.floor(Math.random() * identities.length)];
        showCustomNeuralMessage(identity);
    }
}

// ===== LANGUAGE SYSTEM =====
function switchNeuralLanguage(lang) {
    NeuralState.language = lang;
    
    // Update document
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.body.className = ''; // Clear classes
    document.body.classList.add(`language-${lang}`);
    document.body.classList.add(`neural-${NeuralState.deviceType}`);
    if (document.body.classList.contains('touch-optimized')) {
        document.body.classList.add('touch-optimized');
    }
    
    // Update buttons
    neuralDOM.langButtons.forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update timer mode label
    updateTimerModeLabel();
    
    // Update progress text
    updateNeuralProgress();
    
    // Show message in new language
    showNeuralMessage('startup');
    
    // Save preference
    saveNeuralState();
}

// ===== NEURAL EFFECTS =====
function createNeuralParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // Clear existing particles
    particlesContainer.innerHTML = '';
    
    // Create particles based on device
    const particleCount = NeuralState.deviceType === 'mobile' ? 20 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'neural-particle';
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        // Apply styles
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(45deg, var(--neural-cyan), var(--neural-purple));
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            opacity: ${Math.random() * 0.3 + 0.1};
            animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS animation
    if (!document.querySelector('#particle-animations')) {
        const style = document.createElement('style');
        style.id = 'particle-animations';
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.1; }
                25% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) scale(1.2); opacity: 0.3; }
                50% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) scale(0.8); opacity: 0.2; }
                75% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) scale(1.1); opacity: 0.4; }
            }
        `;
        document.head.appendChild(style);
    }
}

function triggerNeuralCelebration() {
    // Add celebration class
    document.body.classList.add('neural-celebration');
    
    // Remove after animation
    setTimeout(() => {
        document.body.classList.remove('neural-celebration');
    }, 3000);
    
    // Show celebration message
    const celebrations = NeuralState.language === 'ar'
        ? ["مبروك! جلسة تركيز كاملة! انت اسطورة!", "عملت العظيم! استحق راحة جامدة!"]
        : ["Congratulations! Full focus session complete! You're a legend!", "Amazing work! You deserve an epic break!"];
    
    setTimeout(() => {
        showCustomNeuralMessage(celebrations[Math.floor(Math.random() * celebrations.length)]);
    }, 500);
}

function triggerLevelUp() {
    // Show level up message
    const levelUpMessage = NeuralState.language === 'ar'
        ? `مبروك! وصلت للمستوى ${NeuralState.userLevel}!`
        : `Congratulations! Reached Level ${NeuralState.userLevel}!`;
    
    showCustomNeuralMessage(levelUpMessage);
    
    // Visual celebration
    document.body.classList.add('level-up');
    setTimeout(() => {
        document.body.classList.remove('level-up');
    }, 2000);
}

function revealNeuralReward() {
    // Show reward message after delay
    setTimeout(() => {
        const rewards = NeuralState.language === 'ar'
            ? ["المكافأة: اتطورت في التركيز! عقلك بقى أقوى!", "جائزة التركيز: انت بتتحول لآلة إنتاجية!"]
            : ["Reward: Your focus evolved! Your brain is stronger!", "Focus Prize: You're becoming a productivity machine!"];
        
        showCustomNeuralMessage(rewards[Math.floor(Math.random() * rewards.length)]);
    }, 1000);
}

function visualizeEndState() {
    // Visualization after session
    setTimeout(() => {
        const visualizations = NeuralState.language === 'ar'
            ? ["تخيل نفسك بعد سنة من التركيز ده! قوة لا تُهزم!", "شوف صورتك في المستقبل وانت ناجح في كل حاجة!"]
            : ["Visualize yourself one year from this focus! Unstoppable power!", "See your future self succeeding in everything!"];
        
        showCustomNeuralMessage(visualizations[Math.floor(Math.random() * visualizations.length)]);
    }, 2000);
}

function playNeuralSound(type) {
    // Conceptual sound system - in real app would use Web Audio API
    console.log(`🔊 Playing neural sound: ${type}`);
    
    // For demo purposes, just log
    const sounds = {
        start: '▶️ Focus activated',
        pause: '⏸️ Focus suspended',
        complete: '🎯 Session complete',
        level: '⬆️ Level up'
    };
    
    console.log(sounds[type] || '🔊 Neural sound');
}

// ===== EVENT HANDLERS =====
function setupNeuralConnections() {
    // Welcome Modal
    neuralDOM.enterBtn.addEventListener('click', () => {
        neuralDOM.welcomeModal.classList.remove('active');
        activatePsychologyEngine();
        showNeuralMessage('startup');
    });
    
    neuralDOM.cancelBtn.addEventListener('click', () => {
        neuralDOM.welcomeModal.classList.remove('active');
        showNeuralMessage('motivation');
    });
    
    // Timer Controls
    neuralDOM.startBtn.addEventListener('click', startNeuralTimer);
    neuralDOM.pauseBtn.addEventListener('click', pauseNeuralTimer);
    neuralDOM.resetBtn.addEventListener('click', resetNeuralTimer);
    
    // Mode Selection
    neuralDOM.modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            neuralDOM.modeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Switch mode
            NeuralState.timerMode = btn.dataset.mode;
            
            // Reset timer for new mode
            resetNeuralTimer();
            
            // Update current time
            NeuralState.currentTime = NeuralState.timerMode === 'pomodoro' 
                ? NeuralState.focusDuration 
                : (NeuralState.timerMode === 'custom' ? NeuralState.focusDuration : 0);
            
            updateNeuralTimer();
            
            // Save state
            saveNeuralState();
        });
    });
    
    // Activity Selection
    neuralDOM.activityCards.forEach(card => {
        card.addEventListener('click', () => {
            selectNeuralActivity(card.dataset.activity);
        });
    });
    
    // Custom Activity
    neuralDOM.saveCustomBtn.addEventListener('click', () => {
        const activityName = neuralDOM.customActivityInput.value.trim();
        const duration = parseInt(neuralDOM.customDuration.value);
        
        if (activityName) {
            // Add to custom activities
            NeuralState.customActivities.push({
                name: activityName,
                duration: duration,
                createdAt: new Date().toISOString()
            });
            
            // Set as current activity
            NeuralState.currentActivity = 'custom';
            NeuralState.focusDuration = duration * 60;
            
            // Update UI
            selectNeuralActivity('custom');
            updateNeuralTimer();
            
            // Show confirmation
            const confirmMsg = NeuralState.language === 'ar'
                ? `"${activityName}" اتعملت! ${duration} دقيقة تركيز`
                : `"${activityName}" created! ${duration} minutes of focus`;
            
            showCustomNeuralMessage(confirmMsg);
            
            // Save state
            saveNeuralState();
        }
    });
    
    // Psychology Boosters
    neuralDOM.boosterToggles.forEach(toggle => {
        toggle.addEventListener('change', () => {
            const booster = toggle.closest('.booster-card').dataset.booster;
            NeuralState.psychology[booster] = toggle.checked;
            
            // Update card state
            const card = toggle.closest('.booster-card');
            if (toggle.checked) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
            
            // Update counter
            const activeCount = Object.values(NeuralState.psychology).filter(v => v).length;
            neuralDOM.activeBoosters.textContent = activeCount;
            
            // Save state
            saveNeuralState();
            
            // Show feedback
            const feedback = NeuralState.language === 'ar'
                ? `${booster} ${toggle.checked ? 'اتفعّل' : 'اتعطّل'}`
                : `${booster} ${toggle.checked ? 'activated' : 'deactivated'}`;
            
            console.log(`🧠 ${feedback}`);
        });
    });
    
    // Language Switch
    neuralDOM.langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            switchNeuralLanguage(btn.dataset.lang);
        });
    });
    
    // Quick Actions
    neuralDOM.quickStartBtn.addEventListener('click', () => {
        if (!NeuralState.timerActive) {
            startNeuralTimer();
        }
    });
    
    neuralDOM.deepFocusBtn.addEventListener('click', () => {
        // Activate all psychology boosters
        Object.keys(NeuralState.psychology).forEach(key => {
            NeuralState.psychology[key] = true;
        });
        
        // Update UI
        updatePsychologyBoosters();
        
        // Show message
        const msg = NeuralState.language === 'ar'
            ? "كل المعززات النفسية اتعملت! تركيز عميق مفعل!"
            : "All psychology boosters activated! Deep focus engaged!";
        
        showCustomNeuralMessage(msg);
        
        // Start timer if not running
        if (!NeuralState.timerActive) {
            startNeuralTimer();
        }
    });
    
    neuralDOM.quickBreakBtn.addEventListener('click', () => {
        if (NeuralState.timerActive) {
            pauseNeuralTimer();
        }
        
        // Set break timer
        NeuralState.timerMode = 'custom';
        NeuralState.focusDuration = 5 * 60; // 5 minute break
        NeuralState.currentTime = NeuralState.focusDuration;
        
        // Update UI
        neuralDOM.modeButtons.forEach(b => b.classList.remove('active'));
        document.querySelector('.mode-btn[data-mode="custom"]').classList.add('active');
        updateNeuralTimer();
        
        // Show break message
        const msg = NeuralState.language === 'ar'
            ? "راحة ٥ دقائق مفعلة! استعد لجولة جديدة!"
            : "5 minute break activated! Prepare for next round!";
        
        showCustomNeuralMessage(msg);
        
        // Start break timer
        setTimeout(() => {
            startNeuralTimer();
        }, 1000);
    });
    
    neuralDOM.focusMusicBtn.addEventListener('click', () => {
        // In a real app, this would play focus music
        const msg = NeuralState.language === 'ar'
            ? "موسيقى التركيز: موجات دماغية مثالية للانتاجية!"
            : "Focus Music: Perfect brainwaves for productivity!";
        
        showCustomNeuralMessage(msg);
        
        // Visual effect
        document.body.classList.add('music-active');
        setTimeout(() => {
            document.body.classList.remove('music-active');
        }, 1000);
    });
    
    // Next Message
    neuralDOM.nextMsgBtn.addEventListener('click', () => {
        showNeuralMessage('motivation');
    });
    
    // Fullscreen
    neuralDOM.fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Fullscreen error: ${err.message}`);
            });
            neuralDOM.fullscreenBtn.innerHTML = '<i class="fas fa-compress-alt"></i>';
        } else {
            document.exitFullscreen();
            neuralDOM.fullscreenBtn.innerHTML = '<i class="fas fa-expand-alt"></i>';
        }
    });
    
    // Stats Modal
    neuralDOM.statsBtn.addEventListener('click', () => {
        neuralDOM.statsModal.classList.add('active');
        updateStatsDisplay();
    });
    
    // Close modals
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal-overlay').forEach(modal => {
                modal.classList.remove('active');
            });
        });
    });
    
    // Handle Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close modals
            document.querySelectorAll('.modal-overlay').forEach(modal => {
                modal.classList.remove('active');
            });
            
            // Prevent exit during focus
            if (NeuralState.timerActive && NeuralState.psychology.flowProtection) {
                e.preventDefault();
                showCustomNeuralMessage(NeuralState.language === 'ar' 
                    ? "ماضغطش على Escape! ركز في شغلك!"
                    : "Don't press Escape! Focus on your work!");
            }
        }
    });
}

function updateStatsDisplay() {
    // This would update the stats modal with detailed analytics
    console.log('📊 Updating neural analytics display');
}

function showExitProtection() {
    // Create and show exit protection modal
    const exitModal = document.createElement('div');
    exitModal.className = 'modal-overlay active';
    exitModal.innerHTML = `
        <div class="modal-content exit-modal">
            <div class="modal-header">
                <h2 class="english">FOCUS BREACH DETECTED</h2>
                <h2 class="arabic">تم اكتشاف خرق تركيز</h2>
            </div>
            <div class="modal-body">
                <div class="exit-warning">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p class="english">You're breaking your focus flow. This will reset your mental momentum.</p>
                    <p class="arabic">انت بتكسر تدفق تركيزك. ده هيضيع زخمك الذهني.</p>
                </div>
                <div class="modal-actions">
                    <button class="btn btn-ghost" id="confirmExit">
                        <span class="english">EXIT ANYWAY</span>
                        <span class="arabic">اخرج برضه</span>
                    </button>
                    <button class="btn btn-premium" id="stayFocused">
                        <i class="fas fa-brain"></i>
                        <span class="english">STAY FOCUSED</span>
                        <span class="arabic">فضل مركّز</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(exitModal);
    
    // Add event listeners
    setTimeout(() => {
        document.getElementById('confirmExit').addEventListener('click', () => {
            document.body.removeChild(exitModal);
            // Allow exit
        });
        
        document.getElementById('stayFocused').addEventListener('click', () => {
            document.body.removeChild(exitModal);
            showCustomNeuralMessage(NeuralState.language === 'ar'
                ? "كفو! رجّع شغلك! عقلك يستاهل التركيز!"
                : "Good choice! Back to work! Your brain deserves this focus!");
        });
    }, 100);
}

function triggerPsychologyEvents() {
    // Random psychology triggers during timer
    if (NeuralState.timerActive) {
        // Every 2 minutes
        if (NeuralState.currentTime % 120 === 0) {
            // Random psychology event
            const events = ['commitment', 'ego', 'loss'];
            const randomEvent = events[Math.floor(Math.random() * events.length)];
            
            switch (randomEvent) {
                case 'commitment':
                    if (NeuralState.psychology.commitment) {
                        const msg = NeuralState.language === 'ar'
                            ? "انت متعهّد! مينفعش توقف في نص الطريق!"
                            : "You're committed! Can't stop halfway!";
                        showCustomNeuralMessage(msg);
                    }
                    break;
                    
                case 'ego':
                    if (NeuralState.psychology.egoTrigger) {
                        const msg = NeuralState.language === 'ar'
                            ? "محدش في الدنيا يقدر يوقفك! استمر!"
                            : "No one on earth can stop you now! Keep going!";
                        showCustomNeuralMessage(msg);
                    }
                    break;
                    
                case 'loss':
                    if (NeuralState.psychology.lossAversion) {
                        const invested = Math.floor(NeuralState.currentTime / 60);
                        const msg = NeuralState.language === 'ar'
                            ? `هتضيع ${invested} دقيقة مجهود لو وقفت!`
                            : `You'll waste ${invested} minutes of effort if you stop!`;
                        showCustomNeuralMessage(msg);
                    }
                    break;
            }
        }
        
        // Every 5 minutes - progress update
        if (NeuralState.currentTime % 300 === 0) {
            const progress = Math.floor((1 - (NeuralState.currentTime / NeuralState.focusDuration)) * 100);
            const msg = NeuralState.language === 'ar'
                ? `إنجاز ${progress}%! استمر في التقدم!`
                : `${progress}% complete! Keep progressing!`;
            showCustomNeuralMessage(msg);
        }
    }
}

function updateProductivityScore(change) {
    NeuralState.analytics.productivityScore = Math.max(0, 
        Math.min(100, NeuralState.analytics.productivityScore + change));
    
    updateScoreCircle(NeuralState.analytics.productivityScore);
    neuralDOM.focusScore.textContent = `${NeuralState.analytics.productivityScore}%`;
    neuralDOM.footerProductivity.textContent = `${NeuralState.analytics.productivityScore}%`;
}

function startCognitiveEngine() {
    console.log('🚀 Cognitive Engine Started');
    
    // Periodic psychology triggers
    setInterval(() => {
        if (!NeuralState.timerActive && NeuralState.psychology.cognitiveWarmup) {
            // Random cognitive warm-up
            if (Math.random() < 0.05) { // 5% chance every interval
                const questions = NeuralState.language === 'ar'
                    ? ["ايه اول خطوة هتبدأ بيها النهاردة؟", "هتكون ايه بعد سنة من التركيز المستمر؟"]
                    : ["What's the first step you'll take today?", "Who will you be after one year of consistent focus?"];
                
                const question = questions[Math.floor(Math.random() * questions.length)];
                showCustomNeuralMessage(question);
            }
        }
    }, 30000); // Every 30 seconds
    
    // Auto-save every minute
    setInterval(() => {
        saveNeuralState();
    }, 60000);
}

// ===== INITIALIZE =====
// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Small delay for smoother startup
    setTimeout(neuralInit, 100);
});

// Handle page errors
window.addEventListener('error', (e) => {
    console.error('🧠 Neural System Error:', e.error);
    
    // Show user-friendly error
    const errorMsg = NeuralState.language === 'ar'
        ? "حصل خطأ بسيط. النظام بيرجع تاني دلوقتي..."
        : "Minor error detected. System rebooting...";
    
    if (neuralDOM.englishMessage) {
        neuralDOM.englishMessage.textContent = "System recalibrating...";
        neuralDOM.arabicMessage.textContent = "النظام بيتعاير تاني...";
    }
    
    // Attempt recovery
    setTimeout(() => {
        location.reload();
    }, 3000);
});

// Export for debugging
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        NeuralState,
        neuralInit,
        startNeuralTimer,
        pauseNeuralTimer,
        resetNeuralTimer,
        switchNeuralLanguage,
        selectNeuralActivity
    };
}// أضف هذه الدالة في قسم Environment Detection في app.js
function optimizeForMobile() {
    if (NeuralState.deviceType === 'mobile' || NeuralState.deviceType === 'tablet') {
        // تقليل عدد الجسيمات للموبايل
        const particleCount = NeuralState.deviceType === 'mobile' ? 15 : 30;
        
        // تعديل timings للموبايل
        if (window.innerWidth <= 768) {
            // تقليل animation durations للموبايل
            document.documentElement.style.setProperty('--transition-normal', '200ms');
            document.documentElement.style.setProperty('--transition-slow', '300ms');
            
            // إضافة touch feedback للكروت
            neuralDOM.activityCards.forEach(card => {
                card.style.cursor = 'pointer';
                card.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(0.98)';
                });
                card.addEventListener('touchend', function() {
                    this.style.transform = '';
                });
            });
        }
        
        // تحسين الذاكرة للموبايل
        setInterval(() => {
            if (!NeuralState.timerActive) {
                // Clean up particles when not needed
                const particles = document.querySelectorAll('.neural-particle');
                if (particles.length > particleCount * 2) {
                    particles.forEach((p, i) => {
                        if (i > particleCount) p.remove();
                    });
                }
            }
        }, 30000);
    }
}

// استدعاء الدالة في neuralInit
function neuralInit() {
    console.log('⚡ Neural Focus System Initializing...');
    
    detectNeuralEnvironment();
    loadNeuralState();
    setupNeuralConnections();
    initializeNeuralInterface();
    startCognitiveEngine();
    optimizeForMobile(); // <-- إضافة هذا السطر
    
    console.log('🧠 Neural System Ready');
}

// إضافة touch events للbuttons
function setupTouchEvents() {
    // Touch feedback للbuttons
    const buttons = document.querySelectorAll('button, .btn, .action-btn');
    buttons.forEach(btn => {
        btn.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });
        btn.addEventListener('touchend', function() {
            this.style.opacity = '';
        });
    });
}

// استدعاء في setupNeuralConnections
function setupNeuralConnections() {
    // ... الكود الحالي ...
    
    setupTouchEvents(); // <-- إضافة هذا السطر
    
    // ... باقي الكود ...
}
