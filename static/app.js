(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  const copy = {
    zh: {
      language: "EN",
      musicOn: "音乐陪伴中",
      musicOff: "音乐已关",
      eyebrow: "今晚，不必逞强",
      mainLineOne: "让情绪有地方",
      mainLineTwo: "停靠。",
      sanctuaryCopy: "这里没有评判，也不用急着变好。<br>你只需要，把心里的话写下来。",
      promiseText: "一呼一吸之间，<br>世界会慢一点。",
      writerLabel: "写给自己",
      composerTitle: "此刻，你还好吗？",
      moodLabel: "靠近此刻的感受",
      moodOptional: "可选",
      moods: {
        tired: "有点累",
        wronged: "很委屈",
        anxious: "有些焦虑",
        angry: "在生气",
        sad: "很难过",
        lonely: "有点孤独",
        unknown: "说不清",
      },
      placeholderOne: "把那些没说出口的话，",
      placeholderTwo: "都留在这里吧……",
      writingHint: "不需要组织语言，想到什么就写什么",
      modeLabel: "输入方式",
      keyboard: "键盘",
      voice: "语音",
      handwriting: "手写",
      listening: "正在聆听，说出心里的话…",
      messageLabel: "写下此刻的心情",
      replyClose: "关闭",
      voiceDenied: "没有获得麦克风权限，请在浏览器中允许后重试",
      voiceUnsupported: "当前浏览器暂不支持语音识别，请使用 Chrome 或 Edge",
      voiceNoSpeech: "没有听清，可以再说一次",
      handwritingTitle: "手写你的心情",
      handwritingHint: "写下来，不必让任何人看懂",
      send: "把心事交给小站",
      localNote: "这封信只寄往本机后台，不会上传到云端",
      empty: "先写一点什么，或让手写画布留下你的笔迹",
      sendError: "暂时没有连接上小站后台，请确认本地服务仍在运行",
      footer: "心屿 · 给每一种心情一盏灯",
      musicKicker: "最后一件小事",
      musicTitle: "要让一点声音，<br>陪你待一会儿吗？",
      musicCopy: "我们会播放一段轻柔的环境音，不打扰，只陪伴。",
      musicYes: "开启舒缓音乐",
      musicNo: "安静地进入",
      back: "返回选择语言",
      replyMeta: "小站给你的回信",
      breathTitle: "和我一起，慢慢呼吸",
      breathCopy: "吸气 4 秒 · 停留 2 秒 · 呼气 6 秒",
      read: "轻声读给我听",
      stopRead: "先安静一会儿",
      again: "再写一点",
      saved: "已安静地收进本机后台",
      toastSaved: "心事已送达，回信正在靠近",
      handwritingDraft: "手写的这一段，也是我真实的心情。",
      morning: "一个适合慢慢醒来的早晨",
      afternoon: "一个可以短暂停靠的午后",
      evening: "一个适合慢下来的晚上",
      night: "夜很安静，你可以慢一点",
      replyTitles: {
        tired: "你不是不够好，<br>只是今天太累了。",
        wronged: "你的委屈，<br>值得被认真听见。",
        anxious: "不用看清整条路，<br>先走好这一小步。",
        angry: "你的边界，<br>值得被好好守住。",
        sad: "难过的时候，<br>可以先停一停。",
        lonely: "今夜，<br>至少有一盏灯为你亮着。",
        overwhelmed: "先放下一些，<br>你不需要同时接住所有。",
        unknown: "说不清也没关系，<br>我听见你了。",
      },
    },
    en: {
      language: "中文",
      musicOn: "Music is playing",
      musicOff: "Music is off",
      eyebrow: "TONIGHT, YOU DON'T HAVE TO BE STRONG",
      mainLineOne: "Let it all",
      mainLineTwo: "land here.",
      sanctuaryCopy: "There is no judgement, and no rush to feel better.<br>You only need to put it into words.",
      promiseText: "Between one breath and the next,<br>the world can slow down.",
      writerLabel: "A NOTE TO YOURSELF",
      composerTitle: "How are you, really?",
      moodLabel: "What feels closest right now?",
      moodOptional: "optional",
      moods: {
        tired: "Exhausted",
        wronged: "Hurt",
        anxious: "Anxious",
        angry: "Angry",
        sad: "Sad",
        lonely: "Lonely",
        unknown: "Hard to name",
      },
      placeholderOne: "Leave the words you couldn't say",
      placeholderTwo: "right here for a moment…",
      writingHint: "No need to make sense — just begin",
      modeLabel: "INPUT",
      keyboard: "Type",
      voice: "Speak",
      handwriting: "Write",
      listening: "Listening — say what is on your mind…",
      messageLabel: "What would you like to leave here?",
      replyClose: "Close",
      voiceDenied: "Microphone access was not granted. Please allow it and try again.",
      voiceUnsupported: "Voice input is unavailable here. Try using Chrome or Edge.",
      voiceNoSpeech: "I didn't catch that. You can try again.",
      handwritingTitle: "Write how it feels",
      handwritingHint: "No one else has to read it",
      send: "Send this to the station",
      localNote: "Saved only to this device's local backend",
      empty: "Write something first, or leave a mark on the handwriting canvas",
      sendError: "The local station could not be reached. Check that its service is still running.",
      footer: "Inner Isle · A small light for every feeling",
      musicKicker: "ONE MORE THING",
      musicTitle: "Would you like a little sound<br>to keep you company?",
      musicCopy: "A soft ambient soundscape will play. Nothing loud — just company.",
      musicYes: "Play calming music",
      musicNo: "Enter quietly",
      back: "Back to language",
      replyMeta: "A LETTER FROM THE STATION",
      breathTitle: "Breathe slowly with me",
      breathCopy: "Inhale 4s · hold 2s · exhale 6s",
      read: "Read it to me",
      stopRead: "Let it be quiet",
      again: "Write a little more",
      saved: "Quietly saved to this device",
      toastSaved: "Delivered. A reply is on its way.",
      handwritingDraft: "This handwritten page is how I feel right now.",
      morning: "A morning made for waking slowly",
      afternoon: "An afternoon that can pause with you",
      evening: "An evening made for slowing down",
      night: "The night is quiet; you can be, too",
      replyTitles: {
        tired: "You are not falling short.<br>Today was simply heavy.",
        wronged: "What hurt you<br>deserves to be heard.",
        anxious: "You don't need the whole road.<br>Just the next small step.",
        angry: "Your boundaries<br>deserve room to stand.",
        sad: "When you are sad,<br>you are allowed to pause.",
        lonely: "Tonight, at least one light<br>is on for you.",
        overwhelmed: "Put some things down.<br>You don't have to hold it all.",
        unknown: "Not having the words<br>is okay. I hear you.",
      },
    },
  };

  const state = {
    lang: "zh",
    musicWanted: false,
    mood: "",
    mode: "keyboard",
    audioContext: null,
    masterGain: null,
    audioNodes: [],
    musicPlaying: false,
    recognition: null,
    listening: false,
    speechBase: "",
    speechFinal: "",
    speechInterim: "",
    handwritingHasInk: false,
    canvasReady: false,
    canvasHistory: [],
    pointerDown: false,
    activePointerId: null,
    lastReply: "",
    lastMood: "unknown",
    busy: false,
    lastFocus: null,
    reading: false,
    toastTimer: null,
  };

  function setText(id, value) {
    const element = $(id);
    if (element) element.textContent = value;
  }

  function setHTML(id, value) {
    const element = $(id);
    if (element) element.innerHTML = value;
  }

  function showToast(message) {
    setText("toastText", message);
    const toast = $("toast");
    toast.classList.add("is-visible");
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3800);
  }

  function createStars() {
    const host = $("stars");
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < 52; index += 1) {
      const star = document.createElement("i");
      star.className = "star";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 88}%`;
      star.style.setProperty("--duration", `${3 + Math.random() * 5}s`);
      star.style.setProperty("--delay", `${Math.random() * -7}s`);
      star.style.opacity = `${0.15 + Math.random() * 0.55}`;
      fragment.appendChild(star);
    }
    host.appendChild(fragment);
  }

  function updateTime() {
    const now = new Date();
    setText("localTime", now.toLocaleTimeString(state.lang === "zh" ? "zh-CN" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }));
    const hour = now.getHours();
    let period = "night";
    if (hour >= 5 && hour < 11) period = "morning";
    else if (hour >= 11 && hour < 17) period = "afternoon";
    else if (hour >= 17 && hour < 22) period = "evening";
    setText("todayText", copy[state.lang][period]);
  }

  function updateLanguage() {
    const strings = copy[state.lang];
    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
    setText("languageSwitchText", strings.language);
    setText("eyebrowText", strings.eyebrow);
    setText("mainLineOne", strings.mainLineOne);
    setText("mainLineTwo", strings.mainLineTwo);
    setHTML("sanctuaryCopy", strings.sanctuaryCopy);
    setHTML("promiseText", strings.promiseText);
    setText("writerLabel", strings.writerLabel);
    setText("composerTitle", strings.composerTitle);
    setHTML("moodLabel", `${strings.moodLabel} <span>${strings.moodOptional}</span>`);
    const moodIds = {
      tired: "moodTired",
      wronged: "moodWronged",
      anxious: "moodAnxious",
      angry: "moodAngry",
      sad: "moodSad",
      lonely: "moodLonely",
      unknown: "moodUnknown",
    };
    Object.entries(moodIds).forEach(([mood, id]) => setText(id, strings.moods[mood]));
    setText("placeholderOne", strings.placeholderOne);
    setText("placeholderTwo", strings.placeholderTwo);
    setText("writingHint", strings.writingHint);
    setText("modeLabel", strings.modeLabel);
    setText("keyboardText", strings.keyboard);
    setText("voiceText", strings.voice);
    setText("handwritingText", strings.handwriting);
    setText("voiceStatusText", strings.listening);
    setText("messageLabel", strings.messageLabel);
    $("message").setAttribute("aria-label", strings.messageLabel);
    $("replyClose").setAttribute("aria-label", strings.replyClose);
    setText("handwritingTitle", strings.handwritingTitle);
    setText("handwritingHint", strings.handwritingHint);
    setText("sendLabel", strings.send);
    setText("localNoteText", strings.localNote);
    setText("footerText", strings.footer);
    setText("musicKicker", strings.musicKicker);
    setHTML("musicTitle", strings.musicTitle);
    setText("musicCopy", strings.musicCopy);
    setText("musicYesText", strings.musicYes);
    setText("musicNoText", strings.musicNo);
    setText("backText", strings.back);
    setText("replyMeta", strings.replyMeta);
    setText("breatheTitle", strings.breathTitle);
    setText("breatheCopy", strings.breathCopy);
    setText("readText", state.reading ? strings.stopRead : strings.read);
    setText("againText", strings.again);
    setText("replySaved", strings.saved);
    document.title = state.lang === "zh" ? "心屿 · 情绪疗愈小站" : "Inner Isle · A quiet place to feel";
    updateMusicButton();
    updateTime();

    if (state.recognition) {
      state.recognition.lang = state.lang === "zh" ? "zh-CN" : "en-US";
    }
    if (state.listening) stopListening(false);
  }

  function chooseLanguage(language) {
    state.lang = language;
    updateLanguage();
    setText("stepCount", "02 / 02");
    const languageStep = $("languageStep");
    const musicStep = $("musicStep");
    languageStep.classList.remove("is-active");
    languageStep.setAttribute("aria-hidden", "true");
    musicStep.classList.add("is-active");
    musicStep.setAttribute("aria-hidden", "false");
    window.setTimeout(() => $("musicYes").focus(), 180);
  }

  function returnToLanguage() {
    setText("stepCount", "01 / 02");
    $("musicStep").classList.remove("is-active");
    $("musicStep").setAttribute("aria-hidden", "true");
    $("languageStep").classList.add("is-active");
    $("languageStep").setAttribute("aria-hidden", "false");
    window.setTimeout(() => $("languageStep").querySelector("button").focus(), 180);
  }

  function buildAmbientMusic() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return false;

    const context = new AudioContextClass();
    const master = context.createGain();
    const filter = context.createBiquadFilter();
    const delay = context.createDelay(3);
    const feedback = context.createGain();
    const wetGain = context.createGain();

    master.gain.value = 0;
    filter.type = "lowpass";
    filter.frequency.value = 750;
    filter.Q.value = 0.6;
    delay.delayTime.value = 1.65;
    feedback.gain.value = 0.32;
    wetGain.gain.value = 0.22;
    filter.connect(master);
    filter.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(wetGain);
    wetGain.connect(master);
    master.connect(context.destination);

    const voices = [
      { frequency: 130.81, type: "sine", gain: 0.17, detune: -4 },
      { frequency: 196.0, type: "sine", gain: 0.09, detune: 4 },
      { frequency: 261.63, type: "triangle", gain: 0.032, detune: -7 },
      { frequency: 329.63, type: "sine", gain: 0.022, detune: 6 },
    ];

    voices.forEach((voice, index) => {
      const oscillator = context.createOscillator();
      const voiceGain = context.createGain();
      const lfo = context.createOscillator();
      const lfoGain = context.createGain();
      oscillator.type = voice.type;
      oscillator.frequency.value = voice.frequency;
      oscillator.detune.value = voice.detune;
      voiceGain.gain.value = voice.gain;
      lfo.frequency.value = 0.035 + index * 0.011;
      lfoGain.gain.value = voice.gain * 0.35;
      lfo.connect(lfoGain);
      lfoGain.connect(voiceGain.gain);
      oscillator.connect(voiceGain);
      voiceGain.connect(filter);
      oscillator.start();
      lfo.start();
      state.audioNodes.push(oscillator, lfo);
    });

    const breeze = context.createBufferSource();
    const buffer = context.createBuffer(1, context.sampleRate * 3, context.sampleRate);
    const channel = buffer.getChannelData(0);
    for (let index = 0; index < channel.length; index += 1) {
      channel[index] = (Math.random() * 2 - 1) * 0.18;
    }
    const breezeFilter = context.createBiquadFilter();
    const breezeGain = context.createGain();
    breeze.buffer = buffer;
    breeze.loop = true;
    breezeFilter.type = "bandpass";
    breezeFilter.frequency.value = 490;
    breezeFilter.Q.value = 0.5;
    breezeGain.gain.value = 0.008;
    breeze.connect(breezeFilter);
    breezeFilter.connect(breezeGain);
    breezeGain.connect(master);
    breeze.start();
    state.audioNodes.push(breeze);

    state.audioContext = context;
    state.masterGain = master;
    return true;
  }

  async function startMusic() {
    if (!state.audioContext && !buildAmbientMusic()) {
      showToast(state.lang === "zh" ? "当前浏览器不支持环境音播放" : "Ambient audio is unavailable in this browser");
      return false;
    }
    try {
      if (state.audioContext.state === "suspended") await state.audioContext.resume();
      state.masterGain.gain.cancelScheduledValues(state.audioContext.currentTime);
      state.masterGain.gain.setTargetAtTime(0.085, state.audioContext.currentTime, 1.25);
      state.musicPlaying = true;
      updateMusicButton();
      return true;
    } catch {
      showToast(state.lang === "zh" ? "音乐没有成功开启，你可以安静地继续" : "Music could not start. You can continue quietly.");
      return false;
    }
  }

  async function stopMusic() {
    if (!state.musicPlaying || !state.audioContext) {
      state.musicPlaying = false;
      updateMusicButton();
      return;
    }
    state.masterGain.gain.cancelScheduledValues(state.audioContext.currentTime);
    state.masterGain.gain.setTargetAtTime(0, state.audioContext.currentTime, 0.3);
    state.musicPlaying = false;
    updateMusicButton();
    window.setTimeout(() => {
      if (!state.musicPlaying && state.audioContext?.state === "running") {
        state.audioContext.suspend().catch(() => {});
      }
    }, 1200);
  }

  function updateMusicButton() {
    const button = $("musicToggle");
    button.setAttribute("aria-pressed", String(state.musicPlaying));
    setText("musicToggleText", state.musicPlaying ? copy[state.lang].musicOn : copy[state.lang].musicOff);
  }

  async function enterStation(withMusic) {
    state.musicWanted = withMusic;
    if (withMusic) await startMusic();
    $("welcome").classList.add("is-hidden");
    $("site").classList.remove("is-hidden");
    document.body.style.overflow = "";
    window.scrollTo(0, 0);
    updateLanguage();
    window.setTimeout(() => $("message").focus(), 520);
  }

  function setMood(mood) {
    state.mood = state.mood === mood ? "" : mood;
    $$(".mood-chip").forEach((chip) => {
      const selected = chip.dataset.mood === state.mood;
      chip.classList.toggle("is-selected", selected);
      chip.setAttribute("aria-pressed", String(selected));
    });
  }

  function updatePlaceholder() {
    const textarea = $("message");
    $("placeholder").classList.toggle("is-hidden", textarea.value.length > 0);
    setText("charCount", textarea.value.length.toLocaleString(state.lang === "zh" ? "zh-CN" : "en-US"));
  }

  function bindComposer() {
    const textarea = $("message");
    textarea.addEventListener("input", () => {
      updatePlaceholder();
      if (state.mode !== "keyboard") setMode("keyboard");
    });

    $$(".mood-chip").forEach((chip) => {
      chip.setAttribute("aria-pressed", "false");
      chip.addEventListener("click", () => setMood(chip.dataset.mood));
    });

    $("keyboardMode").addEventListener("click", () => {
      setMode("keyboard");
      textarea.focus();
    });
    $("voiceMode").addEventListener("click", () => {
      if (state.listening) stopListening(true);
      else startListening();
    });
    $("handwritingMode").addEventListener("click", () => {
      setMode(state.mode === "handwriting" ? "keyboard" : "handwriting");
    });
  }

  function setMode(mode) {
    if (state.listening && mode !== "voice") stopListening(false);
    state.mode = mode;
    const isVoice = mode === "voice";
    const isHandwriting = mode === "handwriting";
    $("keyboardMode").classList.toggle("is-active", mode === "keyboard");
    $("voiceMode").classList.toggle("is-active", isVoice);
    $("handwritingMode").classList.toggle("is-active", isHandwriting);
    $("keyboardMode").setAttribute("aria-pressed", String(mode === "keyboard"));
    $("voiceMode").setAttribute("aria-pressed", String(isVoice));
    $("handwritingMode").setAttribute("aria-pressed", String(isHandwriting));
    $("handwritingPanel").setAttribute("aria-hidden", String(!isHandwriting));
    $("writingArea").style.opacity = isHandwriting ? "0.72" : "1";
    if (isHandwriting) {
      state.mode = "handwriting";
      toggleListeningClass(false);
      requestAnimationFrame(() => prepareCanvas(false));
    }
  }

  function getRecognition() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) return null;
    const recognition = new Recognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.lang = state.lang === "zh" ? "zh-CN" : "en-US";

    recognition.onstart = () => {
      state.listening = true;
      $("voiceMode").classList.add("is-listening");
      $("voiceStatus").classList.add("is-visible");
      setText("voiceStatusText", copy[state.lang].listening);
    };

    recognition.onresult = (event) => {
      state.speechInterim = "";
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const transcript = event.results[index][0].transcript;
        if (event.results[index].isFinal) state.speechFinal += transcript;
        else state.speechInterim += transcript;
      }
      const sections = [state.speechBase, state.speechFinal.trim(), state.speechInterim.trim()].filter(Boolean);
      $("message").value = sections.join(" ");
      updatePlaceholder();
    };

    recognition.onerror = (event) => {
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        showToast(copy[state.lang].voiceDenied);
      } else if (event.error === "no-speech") {
        showToast(copy[state.lang].voiceNoSpeech);
      } else if (event.error !== "aborted") {
        showToast(state.lang === "zh" ? `语音输入遇到问题：${event.error}` : `Voice input stopped: ${event.error}`);
      }
    };

    recognition.onend = () => {
      state.speechBase = $("message").value.trim();
      state.speechFinal = "";
      state.speechInterim = "";
      state.listening = false;
      toggleListeningClass(false);
    };
    return recognition;
  }

  function startListening() {
    if (!state.recognition) state.recognition = getRecognition();
    if (!state.recognition) {
      showToast(copy[state.lang].voiceUnsupported);
      return;
    }
    state.speechBase = $("message").value.trim();
    state.speechFinal = "";
    state.speechInterim = "";
    state.recognition.lang = state.lang === "zh" ? "zh-CN" : "en-US";
    try {
      state.recognition.start();
      setMode("voice");
    } catch {
      showToast(state.lang === "zh" ? "正在尝试重新聆听，请稍候" : "Getting the microphone ready — try again in a moment.");
    }
  }

  function stopListening(showMessage) {
    if (state.recognition && state.listening) {
      try {
        state.recognition.stop();
      } catch {
        // The browser may already have ended the session.
      }
    }
    state.listening = false;
    toggleListeningClass(false);
    if (showMessage) {
      showToast(state.lang === "zh" ? "语音已结束，可直接修改文字" : "Voice input ended — you can edit the text now.");
    }
  }

  function toggleListeningClass(active) {
    $("voiceMode").classList.toggle("is-listening", active);
    $("voiceStatus").classList.toggle("is-visible", active);
  }

  function prepareCanvas(resetIfEmpty = false) {
    const canvas = $("handwritingCanvas");
    if (!canvas || canvas.offsetParent === null) return;
    const width = Math.max(1, Math.round(canvas.clientWidth));
    const height = Math.max(1, Math.round(canvas.clientHeight));
    if (state.canvasReady && !resetIfEmpty && canvas.dataset.logicalWidth === String(width)) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.dataset.logicalWidth = String(width);
    canvas.dataset.logicalHeight = String(height);
    const context = canvas.getContext("2d");
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.lineCap = "round";
    context.lineJoin = "round";
    state.canvasReady = true;
    if (resetIfEmpty) clearCanvas(false);
  }

  function registerCanvas() {
    const canvas = $("handwritingCanvas");
    const context = canvas.getContext("2d");

    const getPoint = (event) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        pressure: event.pressure > 0 ? event.pressure : 0.5,
      };
    };

    canvas.addEventListener("pointerdown", (event) => {
      if (event.button !== undefined && event.button !== 0) return;
      prepareCanvas(false);
      state.canvasHistory.push(canvas.toDataURL("image/png"));
      if (state.canvasHistory.length > 24) state.canvasHistory.shift();
      state.pointerDown = true;
      state.activePointerId = event.pointerId;
      canvas.setPointerCapture(event.pointerId);
      const point = getPoint(event);
      context.beginPath();
      context.moveTo(point.x, point.y);
      context.strokeStyle = "rgba(242, 194, 178, 0.94)";
      context.lineWidth = 1.3 + point.pressure * 1.7;
      context.globalAlpha = 0.95;
      context.lineTo(point.x + 0.1, point.y + 0.1);
      context.stroke();
      state.handwritingHasInk = true;
    });

    canvas.addEventListener("pointermove", (event) => {
      if (!state.pointerDown || event.pointerId !== state.activePointerId) return;
      event.preventDefault();
      const point = getPoint(event);
      context.lineTo(point.x, point.y);
      context.lineWidth = 1.3 + point.pressure * 1.9;
      context.strokeStyle = "rgba(242, 194, 178, 0.94)";
      context.stroke();
    });

    const finishStroke = (event) => {
      if (event.pointerId !== state.activePointerId) return;
      state.pointerDown = false;
      state.activePointerId = null;
      context.closePath();
    };
    canvas.addEventListener("pointerup", finishStroke);
    canvas.addEventListener("pointercancel", finishStroke);
    canvas.addEventListener("pointerleave", (event) => {
      if (state.pointerDown && event.buttons === 0) finishStroke(event);
    });

    $("clearCanvas").addEventListener("click", () => clearCanvas(true));
    $("undoStroke").addEventListener("click", undoStroke);

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (state.mode === "handwriting") {
          if (!state.handwritingHasInk) prepareCanvas(true);
          else state.canvasReady = false;
        }
      }, 200);
    });
  }

  function clearCanvas(notify) {
    const canvas = $("handwritingCanvas");
    if (!canvas || !canvas.width) return;
    const context = canvas.getContext("2d");
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    state.handwritingHasInk = false;
    state.canvasHistory = [];
    if (notify) showToast(state.lang === "zh" ? "画布已清空" : "The canvas is clear");
  }

  function undoStroke() {
    if (!state.canvasHistory.length) {
      showToast(state.lang === "zh" ? "还没有可以撤销的笔画" : "There is nothing to undo yet");
      return;
    }
    const canvas = $("handwritingCanvas");
    const context = canvas.getContext("2d");
    const snapshot = state.canvasHistory.pop();
    const image = new Image();
    image.onload = () => {
      context.save();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
      context.restore();
      state.handwritingHasInk = state.canvasHistory.length > 0;
    };
    image.src = snapshot;
  }

  function resetInputs({ clearCanvasToo = false } = {}) {
    $("message").value = "";
    setMood("");
    updatePlaceholder();
    if (clearCanvasToo) clearCanvas(false);
  }

  function getHandwritingImage() {
    if (!state.handwritingHasInk) return null;
    const canvas = $("handwritingCanvas");
    if (!canvas || !canvas.width) return null;
    return canvas.toDataURL("image/png");
  }

  async function sendVent() {
    if (state.busy) return;
    const textarea = $("message");
    const typedText = textarea.value.trim();
    const handwriting = getHandwritingImage();
    if (!typedText && !handwriting) {
      showToast(copy[state.lang].empty);
      if (state.mode === "handwriting") canvasPulse();
      else textarea.focus();
      return;
    }

    let message = typedText;
    if (!message && handwriting) message = copy[state.lang].handwritingDraft;
    if (!message && state.mood) message = copy[state.lang].moods[state.mood];

    state.busy = true;
    const button = $("sendButton");
    button.disabled = true;
    button.classList.add("is-loading");
    try {
      const response = await fetch("/api/vent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          lang: state.lang,
          mood: state.mood,
          music: state.musicPlaying,
          handwriting,
        }),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      const data = await response.json();
      showReply(data.reply);
    } catch (error) {
      console.error(error);
      showToast(copy[state.lang].sendError);
    } finally {
      state.busy = false;
      button.disabled = false;
      button.classList.remove("is-loading");
    }
  }

  function canvasPulse() {
    const panel = $("handwritingPanel");
    panel.animate(
      [
        { borderColor: "rgba(235, 231, 247, 0.1)" },
        { borderColor: "rgba(242, 182, 164, 0.65)" },
        { borderColor: "rgba(235, 231, 247, 0.1)" },
      ],
      { duration: 900, iterations: 2 }
    );
  }

  function moodKeyFromReply(reply) {
    if (!reply?.moods?.length) return state.mood || "unknown";
    const name = reply.moods[0];
    const activeStrings = copy[state.lang].moods;
    const found = Object.entries(activeStrings).find(([, value]) => value === name);
    if (found) return found[0];
    if (name === "被压垮" || name === "overwhelm") return "overwhelmed";
    return state.mood || "unknown";
  }

  function showReply(reply) {
    if (!reply?.text) return;
    state.lastFocus = document.activeElement;
    state.lastReply = reply.text;
    state.lastMood = moodKeyFromReply(reply);
    setHTML("replyTitle", copy[state.lang].replyTitles[state.lastMood] || copy[state.lang].replyTitles.unknown);
    setText("replyMoods", (reply.moods || []).join(" · "));
    const letter = $("replyLetter");
    letter.replaceChildren();
    reply.text.split(/\n\n+/).forEach((paragraph) => {
      const element = document.createElement("p");
      element.textContent = paragraph;
      letter.appendChild(element);
    });
    $("replyScreen").classList.add("is-open");
    $("replyScreen").setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    window.setTimeout(() => $("replyClose").focus(), 250);
    showToast(copy[state.lang].toastSaved);
  }

  function closeReply() {
    stopReading();
    $("replyScreen").classList.remove("is-open");
    $("replyScreen").setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (state.lastFocus instanceof HTMLElement) state.lastFocus.focus();
  }

  function speakReply() {
    if (!("speechSynthesis" in window)) {
      showToast(state.lang === "zh" ? "当前浏览器不支持语音朗读" : "Speech playback is unavailable in this browser");
      return;
    }
    if (state.reading) {
      stopReading();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(state.lastReply);
    utterance.lang = state.lang === "zh" ? "zh-CN" : "en-US";
    utterance.rate = state.lang === "zh" ? 0.86 : 0.9;
    utterance.pitch = 0.96;
    utterance.volume = 0.9;
    utterance.onstart = () => {
      state.reading = true;
      setText("readText", copy[state.lang].stopRead);
    };
    utterance.onend = stopReading;
    utterance.onerror = stopReading;
    window.speechSynthesis.speak(utterance);
  }

  function stopReading() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    state.reading = false;
    setText("readText", copy[state.lang].read);
  }

  function bindGlobalActions() {
    $$(".language-card").forEach((button) => {
      button.addEventListener("click", () => chooseLanguage(button.dataset.language));
    });
    $("backToLanguage").addEventListener("click", returnToLanguage);
    $("musicYes").addEventListener("click", () => enterStation(true));
    $("musicNo").addEventListener("click", () => enterStation(false));
    $("musicToggle").addEventListener("click", () => {
      if (state.musicPlaying) stopMusic();
      else startMusic();
    });
    $("languageSwitch").addEventListener("click", () => {
      state.lang = state.lang === "zh" ? "en" : "zh";
      updateLanguage();
      updateTime();
    });
    $("sendButton").addEventListener("click", sendVent);
    $("message").addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        sendVent();
      }
    });
    $("replyClose").addEventListener("click", closeReply);
    $("writeAgain").addEventListener("click", () => {
      closeReply();
      window.setTimeout(() => {
        $("message").focus();
        $("message").scrollIntoView({ behavior: "smooth", block: "center" });
      }, 180);
    });
    $("readReply").addEventListener("click", speakReply);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        if ($("replyScreen").classList.contains("is-open")) closeReply();
        else if (state.listening) stopListening(false);
      }
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && state.listening) stopListening(false);
    });
  }

  function initialize() {
    createStars();
    bindGlobalActions();
    bindComposer();
    registerCanvas();
    updateLanguage();
    updatePlaceholder();
    setInterval(updateTime, 30_000);
  }

  initialize();
})();
