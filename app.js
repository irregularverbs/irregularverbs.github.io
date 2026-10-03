// IRREGULARS APP LOGIC & ADAPTIVE SPACED REPETITION ENGINE
class IrregularsApp {
constructor() {
this.priority = 'high';
this.mode = '2col';
this.limit = 25;
this.exercises = [];
this.currentIndex = 0;
this.score = { correct: 0, incorrect: 0, streak: 0, bestStreak: 0 };
this.userStats = this.loadStats();
this.currentExercise = null;
this.isFlipped = false;
}
​init() {
this.simulateSplash();
this.updateStatsUI();
this.setupEventListeners();
}
​simulateSplash() {
const splash = document.getElementById('splash-screen');
const progressBar = document.getElementById('splash-progress');
​setTimeout(() => { progressBar.style.width = '60%'; }, 150);
setTimeout(() => { progressBar.style.width = '100%'; }, 350);
setTimeout(() => {
splash.style.opacity = '0';
setTimeout(() => {
splash.remove();
}, 500);
}, 600);
}
​setupEventListeners() {
window.addEventListener('keydown', (e) => {
if (e.key === 'Enter') {
const studyView = document.getElementById('view-study');
if (!studyView.classList.contains('hidden')) {
if (this.isFlipped) {
this.nextCard();
}
}
}
});
}
​loadStats() {
const saved = localStorage.getItem('irregulars_stats');
if (saved) {
try { return JSON.parse(saved); } catch(e) { console.error(e); }
}
return {
totalAttempted: 0,
totalCorrect: 0,
totalIncorrect: 0,
streak: 0,
bestStreak: 0,
verbFailures: {},
priorityStats: {
high: { correct: 0, total: 0 },
medium: { correct: 0, total: 0 },
low: { correct: 0, total: 0 },
"very-low": { correct: 0, total: 0 }
}
};
}
​saveStats() {
localStorage.setItem('irregulars_stats', JSON.stringify(this.userStats));
}
​setPriority(priority) {
this.priority = priority;
document.querySelectorAll('.priority-card').forEach(el => el.classList.remove('active'));
document.getElementById(p-${priority}).classList.add('active');
​const labels = { high: 'Alta', medium: 'Media', low: 'Baja', all: 'Todo 🔥' };
document.getElementById('selected-priority-label').innerText = labels[priority];
}
​setMode(mode) {
this.mode = mode;
document.querySelectorAll('.mode-card').forEach(el => el.classList.remove('active'));
document.getElementById(m-${mode}).classList.add('active');
​const labels = { '2col': '2 Columnas', '3col': '3 Columnas', 'both': 'Las Dos 🔥' };
document.getElementById('selected-mode-label').innerText = labels[mode];
}
​setLimit(limit) {
this.limit = limit;
document.querySelectorAll('.limit-btn').forEach(el => {
el.classList.remove('border-indigo-500', 'bg-indigo-500/10', 'text-indigo-300');
el.classList.add('border-slate-800', 'bg-slate-900/50', 'text-slate-300');
});
const btn = document.querySelector([data-limit="${limit}"]);
if (btn) {
btn.classList.remove('border-slate-800', 'bg-slate-900/50', 'text-slate-300');
btn.classList.add('border-indigo-500', 'bg-indigo-500/10', 'text-indigo-300');
}
}
​startSession() {
// Filter exercises based on priority and mode
let filtered = ALL_EXERCISES.filter(ex => {
if (this.priority !== 'all') {
if (this.priority === 'low') {
// Include low and very-low for 'baja' selection or specific
if (ex.priority !== 'low' && ex.priority !== 'very-low') return false;
} else if (ex.priority !== this.priority) {
return false;
}
}
​if (this.mode === '2col' && ex.type !== 'past') return false;
if (this.mode === '3col' && ex.type !== 'participle') return false;
// 'both' includes all types
return true;
});
​// Adaptive weighting: items with more failures appear more frequently
filtered.sort((a, b) => {
const failsA = this.userStats.verbFailures[a.verb] || 0;
const failsB = this.userStats.verbFailures[b.verb] || 0;
return failsB - failsA + (Math.random() - 0.5) * 0.5;
});
​if (this.limit > 0) {
filtered = filtered.slice(0, this.limit);
}
​if (filtered.length === 0) {
alert('No hay ejercicios disponibles para esta combinación.');
return;
}
​this.exercises = filtered;
this.currentIndex = 0;
this.score = { correct: 0, incorrect: 0, streak: this.userStats.streak, bestStreak: this.userStats.bestStreak };
​document.getElementById('view-home').classList.add('hidden');
document.getElementById('view-stats').classList.add('hidden');
document.getElementById('view-study').classList.remove('hidden');
​document.getElementById('nav-home').classList.add('bg-slate-800/80', 'text-white');
document.getElementById('nav-stats').classList.remove('bg-slate-800/80', 'text-white');
​this.loadCurrentCard();
}
​loadCurrentCard() {
if (this.currentIndex >= this.exercises.length) {
this.finishSession();
return;
}
​this.currentExercise = this.exercises[this.currentIndex];
this.isFlipped = false;
document.getElementById('flashcard').classList.remove('flipped');
​// Update UI elements
const typeBadge = document.getElementById('card-type-badge');
if (this.currentExercise.type === 'past') {
typeBadge.innerText = 'Pasado (2ª Columna)';
typeBadge.className = 'px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
} else {
typeBadge.innerText = 'Participio (3ª Columna)';
typeBadge.className = 'px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-violet-500/10 text-violet-400 border border-violet-500/20';
}
​document.getElementById('card-verb-hint').innerText = verbo: ${this.currentExercise.verb};
document.getElementById('card-sentence').innerText = this.currentExercise.sentence;
​const input = document.getElementById('answer-input');
input.value = '';
setTimeout(() => input.focus(), 100);
​// Update session counter
const total = this.exercises.length;
document.getElementById('session-counter').innerText = ${this.currentIndex + 1} / ${total};
document.getElementById('session-progress-bar').style.width = ${((this.currentIndex) / total) * 100}%;
}
​checkAnswer(e) {
if (e) e.preventDefault();
const input = document.getElementById('answer-input');
const userVal = input.value.trim().toLowerCase();
const correctVal = this.currentExercise.answer.toLowerCase();
​this.userStats.totalAttempted++;
​const verbData = IRREGULAR_VERBS_DATA[this.currentExercise.verb];
const pKey = verbData.priority;
if (!this.userStats.priorityStats[pKey]) {
this.userStats.priorityStats[pKey] = { correct: 0, total: 0 };
}
this.userStats.priorityStats[pKey].total++;
​if (userVal === correctVal) {
// CORRECT
this.userStats.totalCorrect++;
this.userStats.priorityStats[pKey].correct++;
this.score.correct++;
this.score.streak++;
if (this.score.streak > this.score.bestStreak) {
this.score.bestStreak = this.score.streak;
}
this.userStats.streak = this.score.streak;
this.userStats.bestStreak = this.score.bestStreak;
this.saveStats();
​this.showToast('✓ ¡Correcto!', 'bg-emerald-600');
this.currentIndex++;
setTimeout(() => this.loadCurrentCard(), 400);
} else {
// INCORRECT -> FLIP CARD (Mandatory repeat until correct)
this.userStats.totalIncorrect++;
this.score.streak = 0;
this.userStats.streak = 0;
​if (!this.userStats.verbFailures[this.currentExercise.verb]) {
this.userStats.verbFailures[this.currentExercise.verb] = 0;
}
this.userStats.verbFailures[this.currentExercise.verb]++;
this.saveStats();
​// Setup back of card details
document.getElementById('feedback-correct-word').innerText = Respuesta: ${correctVal.toUpperCase()};
document.getElementById('mini-verb-title').innerText = verbData.base;
document.getElementById('mini-verb-es').innerText = verbData.es;
document.getElementById('mini-base').innerText = verbData.base;
document.getElementById('mini-past').innerText = verbData.past;
document.getElementById('mini-part').innerText = verbData.participle;
​this.isFlipped = true;
document.getElementById('flashcard').classList.add('flipped');
}
}
​nextCard() {
// After failing, card returns to same question for retry
this.isFlipped = false;
document.getElementById('flashcard').classList.remove('flipped');
const input = document.getElementById('answer-input');
input.value = '';
setTimeout(() => input.focus(), 100);
}
​finishSession() {
this.showToast(¡Sesión completada! Aciertos: ${this.score.correct}, 'bg-indigo-600');
this.goHome();
}
​goHome() {
document.getElementById('view-study').classList.add('hidden');
document.getElementById('view-stats').classList.add('hidden');
document.getElementById('view-home').classList.remove('hidden');
​document.getElementById('nav-home').classList.add('bg-slate-800/80', 'text-white');
document.getElementById('nav-stats').classList.remove('bg-slate-800/80', 'text-white');
this.updateStatsUI();
}
​showStats() {
document.getElementById('view-home').classList.add('hidden');
document.getElementById('view-study').classList.add('hidden');
document.getElementById('view-stats').classList.remove('hidden');
​document.getElementById('nav-stats').classList.add('bg-slate-800/80', 'text-white');
document.getElementById('nav-home').classList.remove('bg-slate-800/80', 'text-white');
​this.updateStatsUI();
}
​updateStatsUI() {
document.getElementById('stat-total').innerText = this.userStats.totalAttempted;
​const accuracy = this.userStats.totalAttempted > 0
? Math.round((this.userStats.totalCorrect / this.userStats.totalAttempted) * 100)
: 0;
document.getElementById('stat-accuracy').innerText = ${accuracy}%;
document.getElementById('stat-streak').innerText = ${this.userStats.streak} 🔥;
document.getElementById('stat-best-streak').innerText = this.userStats.bestStreak;
​// Priority Breakdown Bars
const pStats = this.userStats.priorityStats;
​['high', 'medium', 'low'].forEach(p => {
const data = pStats[p] || { correct: 0, total: 0 };
const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
document.getElementById(prog-${p}).innerText = ${pct}%;
document.getElementById(bar-${p}).style.width = ${pct}%;
});
}
​resetStats() {
if (confirm('¿Estás seguro de reiniciar todas las estadísticas y progreso?')) {
localStorage.removeItem('irregulars_stats');
this.userStats = this.loadStats();
this.updateStatsUI();
this.showToast('Estadísticas restablecidas', 'bg-slate-700');
}
}
​confirmExit() {
if (confirm('¿Seguro que deseas salir de la sesión actual?')) {
this.goHome();
}
}
​showToast(message, bgColor = 'bg-emerald-600') {
const toast = document.getElementById('toast');
const content = document.getElementById('toast-content');
const msg = document.getElementById('toast-msg');
​content.className = ${bgColor} text-white px-4 py-2.5 rounded-xl shadow-xl font-bold text-xs flex items-center space-x-2;
msg.innerText = message;
​toast.classList.remove('translate-y-20', 'opacity-0');
setTimeout(() => {
toast.classList.add('translate-y-20', 'opacity-0');
}, 2200);
}
​installPWA() {
if (window.deferredPrompt) {
window.deferredPrompt.prompt();
window.deferredPrompt.userChoice.then((choiceResult) => {
if (choiceResult.outcome === 'accepted') {
console.log('User accepted the install prompt');
}
window.deferredPrompt = null;
document.getElementById('install-btn').classList.add('hidden');
});
}
}
}
​// Global PWA prompt listener
window.addEventListener('beforeinstallprompt', (e) => {
e.preventDefault();
window.deferredPrompt = e;
const installBtn = document.getElementById('install-btn');
if (installBtn) installBtn.classList.remove('hidden');
});
​const app = new IrregularsApp();
window.addEventListener('DOMContentLoaded', () => app.init());