"use strict";

/*
 * FXG Video tech 2026(c) 西顾视频科技有限公司
 */

const canvas = document.querySelector("#panoCanvas");
const languageButton = document.querySelector("#languageButton");
const mediaFileInput = document.querySelector("#mediaFileInput");
const urlForm = document.querySelector("#urlForm");
const urlInput = document.querySelector("#urlInput");
const resetButton = document.querySelector("#resetButton");
const fullscreenButton = document.querySelector("#fullscreenButton");
const xrButton = document.querySelector("#xrButton");
const gyroButton = document.querySelector("#gyroButton");
const xrScaleSelect = document.querySelector("#xrScaleSelect");
const autorotateInput = document.querySelector("#autorotateInput");
const flipInput = document.querySelector("#flipInput");
const projectionSelect = document.querySelector("#projectionSelect");
const zoomInput = document.querySelector("#zoomInput");
const zoomValue = document.querySelector("#zoomValue");
const muteInput = document.querySelector("#muteInput");
const loopInput = document.querySelector("#loopInput");
const speedInput = document.querySelector("#speedInput");
const viewerTimelineInput = document.querySelector("#viewerTimelineInput");
const viewerCurrentTimeEl = document.querySelector("#viewerCurrentTime");
const viewerDurationTimeEl = document.querySelector("#viewerDurationTime");
const statusEl = document.querySelector("#status");
const dropOverlay = document.querySelector("#dropOverlay");
const viewerCard = document.querySelector(".viewer-card");
const viewerPlayButton = document.querySelector("#viewerPlayButton");

const translations = {
  zh: {
    appTitle: "FXG 全景图片/视频播放器",
    lede: "支持 2:1 ERP 图片、360 视频、本地文件和 URL。拖动看四周，滚轮缩放视角。",
    openLocal: "打开本地文件",
    openUrl: "打开 URL",
    urlPlaceholder: "https://example.com/panorama.mp4",
    fov: "视角宽度",
    projection: "投影格式",
    projectionErp360: "ERP360 2D（2:1）",
    projectionErp360Tb: "ERP360 3D 上下（1:1）",
    projectionVr180: "VR180 2D（1:1）",
    projectionVr180Sbs: "VR180 3D 左右（2:1）",
    projectionFlat: "Non VR 普通矩形",
    projectionFlatSbs: "Non VR 3D 左右",
    projectionFlatTb: "Non VR 3D 上下",
    projectionEac: "EAC 2D（YouTube 3×2）",
    projectionEacTb: "EAC 3D 上下（YouTube 3×2）",
    mute: "静音",
    loop: "循环",
    speed: "速度",
    gyro: "陀螺仪",
    gyroOff: "关闭陀螺仪",
    xrClarity: "XR 清晰度",
    xrClarityTitle: "倍率越高越清晰，也越消耗 Quest 性能",
    xrStandard: "标准 1.0×",
    xrNative: "原生推荐",
    xrEnhanced: "增强 1.5×",
    xrUltra: "超清 2.0×",
    autorotate: "自动旋转",
    flip: "水平翻转",
    hintDrop: "拖拽文件播放",
    hintDrag: "拖拽环视",
    hintPinch: "双指缩放",
    hintWheel: "滚轮缩放",
    hintArrow: "方向键微调",
    hintSpace: "空格播放",
    hintReset: "0 重置",
    defaultStatus: "已载入内置测试全景。换一张图片或 360 ERP 视频试试，入口就在上面。",
    reset: "重置视角",
    fullscreen: "全屏",
    enterXr: "进入 XR",
    exitXr: "退出 XR",
    xrHudTitle: "XR 参数面板",
    xrHudProgress: "进度",
    xrHudImageMode: "图片模式",
    xrHudNoProgress: "无视频进度",
    xrHudPlaying: "播放中",
    xrHudPaused: "已暂停",
    xrHudProjection: "投影",
    xrHudFov: "视角",
    xrHudResolution: "分辨率",
    xrHudVideo: "视频",
    xrHudUnknownDuration: "直播/未知",
    xrHudMuteOn: "静音",
    xrHudMuteOff: "有声",
    xrHudLoopOn: "循环",
    xrHudLoopOff: "单次",
    xrHudPrevProjection: "上一项",
    xrHudNextProjection: "下一项",
    xrHudExit: "退出沉浸",
    xrHudTriggerHint: "用控制器扳机选择；按住进度条可拖动",
    dropTitle: "松开鼠标，直接载入播放",
    dropSubtitle: "自动识别图片或视频；视频会尝试自动播放",
    playVideo: "播放视频",
    pauseVideo: "暂停视频",
    playPauseVideo: "播放或暂停视频",
    langButton: "中/E",
  },
  en: {
    appTitle: "FXG Panorama Image/Video Player",
    lede: "Supports 2:1 ERP images, 360 video, local files, and URLs. Drag to look around, scroll to zoom the field of view.",
    openLocal: "Open Local File",
    openUrl: "Open URL",
    urlPlaceholder: "https://example.com/panorama.mp4",
    fov: "Field of View",
    projection: "Projection",
    projectionErp360: "ERP360 2D (2:1)",
    projectionErp360Tb: "ERP360 3D Top/Bottom (1:1)",
    projectionVr180: "VR180 2D (1:1)",
    projectionVr180Sbs: "VR180 3D Side-by-Side (2:1)",
    projectionFlat: "Non VR Flat",
    projectionFlatSbs: "Non VR 3D Side-by-Side",
    projectionFlatTb: "Non VR 3D Top/Bottom",
    projectionEac: "EAC 2D (YouTube 3x2)",
    projectionEacTb: "EAC 3D Top/Bottom (YouTube 3x2)",
    mute: "Mute",
    loop: "Loop",
    speed: "Speed",
    gyro: "Gyro",
    gyroOff: "Turn Gyro Off",
    xrClarity: "XR Clarity",
    xrClarityTitle: "Higher clarity uses more Quest performance.",
    xrStandard: "Standard 1.0x",
    xrNative: "Native",
    xrEnhanced: "Enhanced 1.5x",
    xrUltra: "Ultra 2.0x",
    autorotate: "Auto Rotate",
    flip: "Flip X",
    hintDrop: "Drop file to play",
    hintDrag: "Drag to look",
    hintPinch: "Pinch to zoom",
    hintWheel: "Wheel zoom",
    hintArrow: "Arrow nudge",
    hintSpace: "Space play",
    hintReset: "0 reset",
    defaultStatus: "Built-in panorama loaded. Open an image or 360 ERP video above.",
    reset: "Reset View",
    fullscreen: "Fullscreen",
    enterXr: "Enter XR",
    exitXr: "Exit XR",
    xrHudTitle: "XR Control Panel",
    xrHudProgress: "Progress",
    xrHudImageMode: "Image Mode",
    xrHudNoProgress: "No video timeline",
    xrHudPlaying: "Playing",
    xrHudPaused: "Paused",
    xrHudProjection: "Projection",
    xrHudFov: "FOV",
    xrHudResolution: "Resolution",
    xrHudVideo: "Video",
    xrHudUnknownDuration: "Live/Unknown",
    xrHudMuteOn: "Muted",
    xrHudMuteOff: "Sound",
    xrHudLoopOn: "Loop",
    xrHudLoopOff: "Once",
    xrHudPrevProjection: "Previous",
    xrHudNextProjection: "Next",
    xrHudExit: "Exit VR",
    xrHudTriggerHint: "Use trigger to select; hold the timeline to scrub",
    dropTitle: "Release to load and play",
    dropSubtitle: "Images and videos are detected automatically; videos will try to autoplay.",
    playVideo: "Play video",
    pauseVideo: "Pause video",
    playPauseVideo: "Play or pause video",
    langButton: "中/E",
  },
};

const video = document.createElement("video");
video.playsInline = true;
video.preload = "auto";
video.crossOrigin = "anonymous";

const gl = canvas.getContext("webgl", {
  antialias: true,
  alpha: false,
  powerPreference: "high-performance",
});

const state = {
  yaw: 0,
  pitch: 0,
  targetYaw: 0,
  targetPitch: 0,
  fov: Number(zoomInput.value),
  targetFov: Number(zoomInput.value),
  dragging: false,
  activePointers: new Map(),
  lastPointer: { x: 0, y: 0 },
  pinchStartDistance: 0,
  pinchStartFov: 0,
  pinching: false,
  gyroEnabled: false,
  gyroSupported: false,
  gyroPermissionGranted: false,
  gyroMatrix: null,
  gyroYawOffset: 0,
  gyroPitchOffset: 0,
  lastTime: performance.now(),
  mediaType: "image",
  projection: "erp360",
  projectionTouched: false,
  texture: null,
  mediaInfo: null,
  videoObjectUrl: null,
  videoReady: false,
  videoUploadFailed: false,
  videoNeedsTextureUpdate: false,
  videoAutoplayOnReady: false,
  timelineSeeking: false,
  xrSession: null,
  xrReferenceSpace: null,
  xrBaseLayer: null,
  xrCompatibleReady: false,
  xrHudDirty: true,
  xrHudLastUpdate: 0,
  xrPanel: null,
  xrPanelElements: [],
  xrPanelActiveId: "",
  xrPanelDrag: null,
  fullscreenOnLoad: false,
  fullscreenRequested: false,
  muteRequestedByQuery: false,
  loopRequestedByQuery: false,
  projectionHint: "",
  language: localStorage.getItem("fxgvr-language") || "zh",
};

const limits = {
  minFov: Number(zoomInput.min),
  maxFov: Number(zoomInput.max),
  maxPitch: Math.PI / 2 - 0.02,
};

if (!gl) {
  setStatus("这个浏览器没有可用的 WebGL，换 Chrome、Edge 或 Safari 试试。", "error");
  throw new Error("WebGL is not available.");
}

const anisotropyExt = gl.getExtension("EXT_texture_filter_anisotropic")
  || gl.getExtension("MOZ_EXT_texture_filter_anisotropic")
  || gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
const maxAnisotropy = anisotropyExt
  ? gl.getParameter(anisotropyExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
  : 0;

const vertexShaderSource = `
  attribute vec3 aPosition;
  attribute vec2 aTexCoord;

  uniform mat4 uProjection;
  uniform mat4 uView;

  varying vec2 vTexCoord;

  void main() {
    vTexCoord = aTexCoord;
    gl_Position = uProjection * uView * vec4(aPosition, 1.0);
  }
`;

const fragmentShaderSource = `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
  #else
    precision mediump float;
  #endif

  uniform sampler2D uTexture;
  uniform bool uFlipX;
  uniform int uProjectionMode;
  uniform int uEyeMode;
  uniform int uXREye;
  uniform float uFlatAspect;

  varying vec2 vTexCoord;

  const float PI = 3.141592653589793;

  vec2 applyEye(vec2 uv) {
    if (uFlipX) {
      uv.x = 1.0 - uv.x;
    }

    if (uEyeMode == 1) {
      uv.y = uv.y * 0.5 + (uXREye == 1 ? 0.5 : 0.0);
    } else if (uEyeMode == 2) {
      uv.x = uv.x * 0.5 + (uXREye == 1 ? 0.5 : 0.0);
    }
    return uv;
  }

  vec2 sampleERP(vec3 dir, float horizontalRange) {
    float longitude = atan(dir.x, dir.z);
    float latitude = asin(clamp(dir.y, -1.0, 1.0));
    float u = longitude / horizontalRange + 0.5;
    float v = 0.5 - latitude / PI;
    return vec2(u, v);
  }

  vec2 sampleFlat(vec3 dir) {
    if (dir.z <= 0.0) {
      discard;
    }

    vec2 plane = vec2(dir.x / dir.z, dir.y / dir.z);
    vec2 uv = vec2(0.5 + plane.x / uFlatAspect, 0.5 - plane.y);

    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
      discard;
    }

    return uv;
  }

  vec2 eacFaceUV(vec2 local) {
    vec2 centered = local * 2.0 - 1.0;
    vec2 curved = atan(centered) / (PI * 0.25);
    return curved * 0.5 + 0.5;
  }

  vec2 sampleEAC(vec3 dir) {
    vec3 ad = abs(dir);
    vec2 local;
    vec2 face;

    if (ad.x >= ad.y && ad.x >= ad.z) {
      if (dir.x > 0.0) {
        local = vec2(-dir.z, dir.y) / ad.x * 0.5 + 0.5;
        face = vec2(2.0, 0.0);
      } else {
        local = vec2(dir.z, dir.y) / ad.x * 0.5 + 0.5;
        face = vec2(0.0, 0.0);
      }
    } else if (ad.y >= ad.x && ad.y >= ad.z) {
      if (dir.y > 0.0) {
        local = vec2(dir.x, -dir.z) / ad.y * 0.5 + 0.5;
        face = vec2(1.0, 0.0);
      } else {
        local = vec2(dir.x, dir.z) / ad.y * 0.5 + 0.5;
        face = vec2(1.0, 1.0);
      }
    } else {
      if (dir.z > 0.0) {
        local = vec2(dir.x, dir.y) / ad.z * 0.5 + 0.5;
        face = vec2(0.0, 1.0);
      } else {
        local = vec2(-dir.x, dir.y) / ad.z * 0.5 + 0.5;
        face = vec2(2.0, 1.0);
      }
    }

    return (face + eacFaceUV(local)) / vec2(3.0, 2.0);
  }

  void main() {
    float phi = (vTexCoord.x - 0.5) * PI * 2.0;
    float theta = vTexCoord.y * PI;
    vec3 dir = normalize(vec3(sin(phi) * sin(theta), cos(theta), cos(phi) * sin(theta)));
    vec2 uv;

    if (uProjectionMode == 1) {
      if (abs(atan(dir.x, dir.z)) > PI * 0.5) {
        discard;
      }
      uv = sampleERP(dir, PI);
    } else if (uProjectionMode == 2) {
      uv = sampleFlat(dir);
    } else if (uProjectionMode == 3) {
      uv = sampleEAC(dir);
    } else {
      uv = sampleERP(dir, PI * 2.0);
    }

    uv = applyEye(uv);
    gl_FragColor = texture2D(uTexture, uv);
  }
`;

const overlayVertexShaderSource = `
  attribute vec3 aPosition;
  attribute vec2 aTexCoord;

  uniform mat4 uMvp;

  varying vec2 vTexCoord;

  void main() {
    vTexCoord = aTexCoord;
    gl_Position = uMvp * vec4(aPosition, 1.0);
  }
`;

const overlayFragmentShaderSource = `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
  #else
    precision mediump float;
  #endif

  uniform sampler2D uTexture;

  varying vec2 vTexCoord;

  void main() {
    gl_FragColor = texture2D(uTexture, vTexCoord);
  }
`;

const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
const locations = {
  position: gl.getAttribLocation(program, "aPosition"),
  texCoord: gl.getAttribLocation(program, "aTexCoord"),
  projection: gl.getUniformLocation(program, "uProjection"),
  view: gl.getUniformLocation(program, "uView"),
  texture: gl.getUniformLocation(program, "uTexture"),
  flipX: gl.getUniformLocation(program, "uFlipX"),
  projectionMode: gl.getUniformLocation(program, "uProjectionMode"),
  eyeMode: gl.getUniformLocation(program, "uEyeMode"),
  xrEye: gl.getUniformLocation(program, "uXREye"),
  flatAspect: gl.getUniformLocation(program, "uFlatAspect"),
};

const overlayProgram = createProgram(gl, overlayVertexShaderSource, overlayFragmentShaderSource);
const overlayLocations = {
  position: gl.getAttribLocation(overlayProgram, "aPosition"),
  texCoord: gl.getAttribLocation(overlayProgram, "aTexCoord"),
  mvp: gl.getUniformLocation(overlayProgram, "uMvp"),
  texture: gl.getUniformLocation(overlayProgram, "uTexture"),
};
const overlayBuffer = gl.createBuffer();
const xrHudCanvas = document.createElement("canvas");
xrHudCanvas.width = 1024;
xrHudCanvas.height = 512;
const xrHudContext = xrHudCanvas.getContext("2d");
const xrHudTexture = createOverlayTexture(xrHudCanvas);

const sphere = createSphere(72, 144);
const positionBuffer = createArrayBuffer(gl, sphere.positions);
const texCoordBuffer = createArrayBuffer(gl, sphere.texCoords);
const indexBuffer = gl.createBuffer();

gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, sphere.indices, gl.STATIC_DRAW);
gl.disable(gl.CULL_FACE);
gl.disable(gl.DEPTH_TEST);
gl.clearColor(0.03, 0.07, 0.09, 1);

initDefaultTexture();
applyLanguage(state.language);
setMute(true);
setLoop(true);
bindEvents();
loadMediaFromQuery();
requestAnimationFrame(render);

function bindEvents() {
  languageButton.addEventListener("click", toggleLanguage);

  mediaFileInput.addEventListener("change", () => {
    const file = mediaFileInput.files && mediaFileInput.files[0];
    if (file) {
      loadLocalMedia(file, true);
    }
  });

  urlForm.addEventListener("submit", (event) => {
    event.preventDefault();
    loadUrlMedia(urlInput.value);
  });

  resetButton.addEventListener("click", resetView);
  fullscreenButton.addEventListener("click", toggleFullscreen);
  xrButton.addEventListener("click", toggleXR);
  gyroButton.addEventListener("click", toggleGyro);
  viewerPlayButton.addEventListener("click", toggleVideoPlayback);
  muteInput.addEventListener("change", () => {
    setMute(muteInput.checked);
  });
  loopInput.addEventListener("change", () => {
    setLoop(loopInput.checked);
  });
  speedInput.addEventListener("change", () => {
    video.playbackRate = Number(speedInput.value);
    markXRHudDirty();
  });
  projectionSelect.addEventListener("change", () => {
    applyProjection(projectionSelect.value, true);
    const eacHint = state.projection.startsWith("eac") ? " EAC 的面顺序可能需要按具体来源微调。" : "";
    setStatus(`投影格式已切换为：${projectionSelect.selectedOptions[0].textContent}。${eacHint}`, "success");
  });

  bindTimelineInput(viewerTimelineInput);

  flipInput.addEventListener("change", () => {
    setStatus(flipInput.checked ? "已水平翻转当前全景。" : "已恢复原始水平方向。", "success");
  });

  zoomInput.addEventListener("input", () => {
    state.targetFov = Number(zoomInput.value);
    zoomValue.textContent = `${Math.round(state.targetFov)}°`;
    markXRHudDirty();
  });

  canvas.addEventListener("pointerdown", (event) => {
    state.activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    state.dragging = state.activePointers.size === 1;
    state.pinching = state.activePointers.size >= 2;
    state.lastPointer = { x: event.clientX, y: event.clientY };

    if (state.pinching) {
      beginPinch();
    }

    if (canvas.setPointerCapture) {
      canvas.setPointerCapture(event.pointerId);
    }
  });

  canvas.addEventListener("pointermove", (event) => {
    if (!state.activePointers.has(event.pointerId)) {
      return;
    }

    state.activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (state.activePointers.size >= 2) {
      updatePinch();
      return;
    }

    if (!state.dragging) {
      return;
    }

    const dx = event.clientX - state.lastPointer.x;
    const dy = event.clientY - state.lastPointer.y;
    state.lastPointer = { x: event.clientX, y: event.clientY };

    if (state.gyroEnabled) {
      state.gyroYawOffset += dx * 0.0048;
      state.gyroPitchOffset = clamp(state.gyroPitchOffset + dy * 0.0048, -limits.maxPitch, limits.maxPitch);
    } else {
      state.targetYaw += dx * 0.0048;
      state.targetPitch = clamp(state.targetPitch + dy * 0.0048, -limits.maxPitch, limits.maxPitch);
    }
  });

  canvas.addEventListener("pointerup", (event) => {
    endPointer(event);
    if (canvas.releasePointerCapture && canvas.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId);
    }
  });

  canvas.addEventListener("pointercancel", (event) => {
    endPointer(event);
  });

  canvas.addEventListener("wheel", (event) => {
    event.preventDefault();
    const nextFov = state.targetFov + Math.sign(event.deltaY) * 4;
    state.targetFov = clamp(nextFov, limits.minFov, limits.maxFov);
    zoomInput.value = String(Math.round(state.targetFov));
    zoomValue.textContent = `${Math.round(state.targetFov)}°`;
    markXRHudDirty();
  }, { passive: false });

  canvas.addEventListener("dblclick", resetView);
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("keydown", handleKeydown);

  video.addEventListener("loadedmetadata", updateTimeline);
  video.addEventListener("durationchange", updateTimeline);
  video.addEventListener("timeupdate", updateTimeline);
  video.addEventListener("seeked", () => {
    state.videoNeedsTextureUpdate = true;
    updateTimeline();
  });
  video.addEventListener("play", updatePlaybackButton);
  video.addEventListener("pause", updatePlaybackButton);
  video.addEventListener("ended", updatePlaybackButton);
  video.addEventListener("loadeddata", () => {
    initializeVideoTexture();
  });
  video.addEventListener("canplay", () => {
    initializeVideoTexture();
  }, { once: false });
  video.addEventListener("error", () => {
    const message = video.error ? getVideoErrorMessage(video.error) : "视频载入失败。";
    setStatus(message, "error");
    resetVideoControls(false);
  });

  document.addEventListener("dragover", (event) => {
    if (!hasFileDrag(event)) {
      return;
    }

    event.preventDefault();
    viewerCard.classList.add("is-dragging");
    dropOverlay.classList.add("is-visible");
  });

  document.addEventListener("dragleave", (event) => {
    if (event.clientX <= 0 || event.clientY <= 0 || event.clientX >= window.innerWidth || event.clientY >= window.innerHeight) {
      viewerCard.classList.remove("is-dragging");
      dropOverlay.classList.remove("is-visible");
    }
  });

  document.addEventListener("drop", (event) => {
    event.preventDefault();
    viewerCard.classList.remove("is-dragging");
    dropOverlay.classList.remove("is-visible");
    const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
    if (file) {
      loadLocalMedia(file, true);
    }
  });

  viewerCard.addEventListener("dragover", (event) => {
    if (!hasFileDrag(event)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    viewerCard.classList.add("is-dragging");
    dropOverlay.classList.add("is-visible");
  });

  viewerCard.addEventListener("dragleave", (event) => {
    if (!viewerCard.contains(event.relatedTarget)) {
      viewerCard.classList.remove("is-dragging");
      dropOverlay.classList.remove("is-visible");
    }
  });

  viewerCard.addEventListener("drop", (event) => {
    event.preventDefault();
    event.stopPropagation();
    viewerCard.classList.remove("is-dragging");
    dropOverlay.classList.remove("is-visible");

    const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
    if (file) {
      loadLocalMedia(file, true);
    }
  });

  checkXRSupport();
  checkGyroSupport();
  resetVideoControls(false);
}

function setMute(enabled) {
  muteInput.checked = enabled;
  video.muted = enabled;
  markXRHudDirty();
}

function setLoop(enabled) {
  loopInput.checked = enabled;
  video.loop = enabled;
  markXRHudDirty();
}

function t(key) {
  return (translations[state.language] && translations[state.language][key])
    || translations.zh[key]
    || key;
}

function toggleLanguage() {
  applyLanguage(state.language === "zh" ? "en" : "zh");
  setStatus(t("defaultStatus"), "success");
}

function applyLanguage(language) {
  state.language = translations[language] ? language : "zh";
  localStorage.setItem("fxgvr-language", state.language);
  document.documentElement.lang = state.language === "zh" ? "zh-CN" : "en";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });

  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    element.setAttribute("title", t(element.dataset.i18nTitle));
  });

  languageButton.textContent = t("langButton");
  languageButton.title = state.language === "zh" ? "Switch to English" : "切换到中文";
  updateGyroButton();
  updateXRButtonText();
  updatePlaybackButton();
  markXRHudDirty();
}

function bindTimelineInput(input) {
  input.addEventListener("input", () => {
    seekVideoFromInput(input);
  });

  input.addEventListener("change", () => {
    state.timelineSeeking = false;
    state.videoNeedsTextureUpdate = true;
  });
}

function seekVideoFromInput(input) {
  if (!isFiniteDuration(video.duration)) {
    return;
  }

  state.timelineSeeking = true;
  const max = Number(input.max) || 1000;
  const value = Number(input.value);
  video.currentTime = video.duration * (value / max);
  syncTimelineInputs(input);
  updateTimeline();
}

function syncTimelineInputs(sourceInput) {
  [viewerTimelineInput].forEach((input) => {
    if (input !== sourceInput) {
      input.value = sourceInput.value;
    }
  });
}

function beginPinch() {
  const distance = getPointerDistance();

  if (!distance) {
    return;
  }

  state.pinching = true;
  state.dragging = false;
  state.pinchStartDistance = distance;
  state.pinchStartFov = state.targetFov;
}

function updatePinch() {
  const distance = getPointerDistance();

  if (!state.pinching || !state.pinchStartDistance || !distance) {
    beginPinch();
    return;
  }

  const scale = distance / state.pinchStartDistance;
  setZoom(state.pinchStartFov / scale);
}

function endPointer(event) {
  state.activePointers.delete(event.pointerId);

  if (state.activePointers.size >= 2) {
    beginPinch();
    return;
  }

  state.pinching = false;
  state.pinchStartDistance = 0;

  if (state.activePointers.size === 1) {
    const remainingPointer = Array.from(state.activePointers.values())[0];
    state.dragging = true;
    state.lastPointer = remainingPointer;
    return;
  }

  state.dragging = false;
}

function getPointerDistance() {
  const pointers = Array.from(state.activePointers.values());

  if (pointers.length < 2) {
    return 0;
  }

  const dx = pointers[0].x - pointers[1].x;
  const dy = pointers[0].y - pointers[1].y;
  return Math.hypot(dx, dy);
}

function handleKeydown(event) {
  if (event.target && ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName)) {
    return;
  }

  const step = event.shiftKey ? 0.16 : 0.07;

  if (event.key === "ArrowLeft") {
    state.targetYaw -= step;
  } else if (event.key === "ArrowRight") {
    state.targetYaw += step;
  } else if (event.key === "ArrowUp") {
    state.targetPitch = clamp(state.targetPitch - step, -limits.maxPitch, limits.maxPitch);
  } else if (event.key === "ArrowDown") {
    state.targetPitch = clamp(state.targetPitch + step, -limits.maxPitch, limits.maxPitch);
  } else if (event.key === "0") {
    resetView();
  } else if (event.key === "+" || event.key === "=") {
    setZoom(state.targetFov - 5);
  } else if (event.key === "-" || event.key === "_") {
    setZoom(state.targetFov + 5);
  } else if (event.code === "Space" && state.mediaType === "video") {
    toggleVideoPlayback();
  } else {
    return;
  }

  event.preventDefault();
}

function loadLocalMedia(file, autoplayVideo = false) {
  const mediaType = getFileMediaType(file);

  if (mediaType === "video") {
    setStatus(`正在读取本地视频：${file.name} ...`);
    loadLocalVideo(file, autoplayVideo);
  } else if (mediaType === "image") {
    setStatus(`正在读取本地图片：${file.name} ...`);
    loadLocalImage(file);
  } else {
    setStatus(`无法识别这个本地文件：${file.name || "未命名文件"}。请确认它是浏览器支持的图片或视频。`, "error");
  }
}

function loadLocalImage(file) {
  if (getFileMediaType(file) !== "image") {
    setStatus("请选择图片文件。", "error");
    return;
  }

  stopVideoSource();

  const objectUrl = URL.createObjectURL(file);
  const image = new Image();
  image.onload = () => {
    try {
      loadImageTexture(image, `本地图片：${file.name}`, file.name);
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      URL.revokeObjectURL(objectUrl);
      setStatus(`载入失败：${error.message}`, "error");
    }
  };
  image.onerror = () => {
    URL.revokeObjectURL(objectUrl);
    setStatus("这张本地图片没有读出来，可能文件已损坏或格式不受浏览器支持。", "error");
  };
  image.src = objectUrl;
}

function loadLocalVideo(file, autoplay = false) {
  if (getFileMediaType(file) !== "video") {
    setStatus("请选择视频文件。", "error");
    return;
  }

  const objectUrl = URL.createObjectURL(file);
  loadVideoSource(objectUrl, `本地视频：${file.name}`, true, autoplay, file.name);
}

function loadUrlMedia(rawUrl) {
  const url = rawUrl.trim();

  if (!url) {
    setStatus("先贴一个图片或视频 URL，再点击打开。", "error");
    return;
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(url, window.location.href);
  } catch {
    setStatus("这个 URL 看起来不太对。请使用完整的 http(s) 媒体链接。", "error");
    return;
  }

  const guessedType = guessMediaTypeFromUrl(parsedUrl.href);

  if (guessedType === "video") {
    loadVideoSource(parsedUrl.href, `URL 视频：${parsedUrl.href}`, false, true, parsedUrl.href);
  } else {
    loadUrlImage(parsedUrl.href);
  }
}

function loadUrlImage(url) {
  stopVideoSource();

  let parsedUrl;
  try {
    parsedUrl = new URL(url, window.location.href);
  } catch {
    setStatus("这个 URL 看起来不太对。请使用完整的 http(s) 图片链接。", "error");
    return;
  }

  const image = new Image();
  image.crossOrigin = "anonymous";
  image.referrerPolicy = "no-referrer";
  image.onload = () => {
    try {
      loadImageTexture(image, `URL 图片：${parsedUrl.href}`, parsedUrl.href);
    } catch (error) {
      setStatus(`图片已下载但不能用于 WebGL：${error.message}`, "error");
    }
  };
  image.onerror = () => {
    setStatus("URL 图片载入失败。常见原因是链接不是图片、服务器禁止跨域访问，或图片需要登录。", "error");
  };
  image.src = parsedUrl.href;
  setStatus("正在载入 URL 图片 ...");
}

function loadMediaFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const imageUrl = params.get("image");
  const videoUrl = params.get("video");
  const mediaUrl = videoUrl || imageUrl || params.get("url") || params.get("URL");
  const projectionParam = params.get("projection");
  const fullscreenParam = params.get("fullscreen");
  const muteParam = params.get("isMute");
  const loopParam = params.get("isLoop");

  if (projectionParam) {
    state.projectionHint = projectionParam;
    const projection = getForcedProjectionFromKeyword(projectionParam);

    if (projection) {
      applyProjection(projection, true);
    }
  }

  state.fullscreenOnLoad = isTruthyQueryValue(fullscreenParam);
  state.muteRequestedByQuery = muteParam === null ? true : isTruthyQueryValue(muteParam);
  state.loopRequestedByQuery = loopParam === null ? true : isTruthyQueryValue(loopParam);
  setMute(state.muteRequestedByQuery);
  setLoop(state.loopRequestedByQuery);

  if (!mediaUrl) {
    return;
  }

  urlInput.value = mediaUrl;

  if (videoUrl || guessMediaTypeFromUrl(mediaUrl) === "video") {
    loadVideoSource(mediaUrl, `URL 视频：${mediaUrl}`, false, true, mediaUrl);
  } else {
    loadUrlImage(mediaUrl);
  }
}

function loadImageTexture(image, label, sourceName = label) {
  const width = image.naturalWidth || image.width;
  const height = image.naturalHeight || image.height;

  if (!width || !height) {
    throw new Error("图片尺寸无效。");
  }

  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
  const source = downscaleIfNeeded(image, width, height, maxTextureSize);

  replaceTexture(createTexture(source.element));
  state.mediaType = "image";
  state.mediaInfo = {
    type: "image",
    label,
    sourceName,
    width,
    height,
    uploadedWidth: source.width,
    uploadedHeight: source.height,
  };
  setProjectionFromSource(width, height, sourceName);

  const ratio = width / height;
  const ratioHint = Math.abs(ratio - 2) > 0.25
    ? " 友情提示：标准全景图通常是 2:1，这张图比例不太像，但我还是帮你打开了。"
    : "";
  const scaleHint = source.wasScaled
    ? ` 已按显卡限制缩小到 ${source.width}×${source.height}。`
    : "";
  const qualityHint = getImmersiveSourceQualityHint(source.width, source.height);

  setStatus(`${label} 已载入，原始尺寸 ${width}×${height}。${scaleHint}${ratioHint}${qualityHint}`, "success");
  enterFullscreenOnLoad();
}

function loadVideoSource(src, label, shouldRevokeObjectUrl, autoplay = false, sourceName = label) {
  stopVideoSource();
  resetVideoControls(false);

  state.mediaType = "video";
  state.mediaInfo = {
    type: "video",
    label,
    sourceName,
    width: 0,
    height: 0,
    src,
  };
  state.videoReady = false;
  state.videoUploadFailed = false;
  state.videoNeedsTextureUpdate = false;
  state.videoAutoplayOnReady = autoplay;

  if (shouldRevokeObjectUrl) {
    state.videoObjectUrl = src;
  }

  video.crossOrigin = shouldRevokeObjectUrl ? null : "anonymous";
  video.muted = muteInput.checked;
  video.loop = loopInput.checked;
  video.playbackRate = Number(speedInput.value);
  video.src = src;
  video.load();

  setStatus(`${label} 正在载入 ...`);
}

function initializeVideoTexture() {
  if (state.mediaType !== "video" || state.videoReady || !video.videoWidth || !video.videoHeight) {
    return;
  }

  try {
    replaceTexture(createTexture(video));
  } catch (error) {
    state.videoUploadFailed = true;
    setStatus(`视频已载入但不能用于 WebGL：${error.message}。URL 视频通常需要服务器允许 CORS。`, "error");
    resetVideoControls(false);
    return;
  }

  state.videoReady = true;
  state.videoNeedsTextureUpdate = true;
  state.mediaInfo = {
    ...state.mediaInfo,
    width: video.videoWidth,
    height: video.videoHeight,
    duration: video.duration,
  };
  setProjectionFromSource(video.videoWidth, video.videoHeight, state.mediaInfo.sourceName || state.mediaInfo.src);

  resetVideoControls(true);
  updateTimeline();

  const ratio = video.videoWidth / video.videoHeight;
  const ratioHint = Math.abs(ratio - 2) > 0.25
    ? " 友情提示：标准 360 ERP 视频通常是 2:1，这个视频比例不太像。"
    : "";
  const qualityHint = getImmersiveSourceQualityHint(video.videoWidth, video.videoHeight);

  const loadedMessage = `${state.mediaInfo.label} 已载入，尺寸 ${video.videoWidth}×${video.videoHeight}。${ratioHint}${qualityHint}`;
  setStatus(loadedMessage, "success");
  enterFullscreenOnLoad();

  if (state.videoAutoplayOnReady) {
    state.videoAutoplayOnReady = false;
    attemptAutoplay(loadedMessage);
  }
}

function attemptAutoplay(successMessage) {
  video.play().then(() => {
    setStatus(successMessage, "success");
  }).catch(() => {
    if (muteInput.checked) {
      setStatus(`${successMessage} 浏览器需要你点击画面左下角播放按钮才能开始。`, "success");
      return;
    }

    setMute(true);
    video.play().then(() => {
      setStatus(`${successMessage} 浏览器限制非静音自动播放，已自动切换为静音播放。`, "success");
    }).catch(() => {
      setStatus(`${successMessage} 浏览器需要你点击画面左下角播放按钮才能开始。`, "success");
    });
  });
}

function stopVideoSource() {
  video.pause();
  video.removeAttribute("src");
  video.load();

  if (state.videoObjectUrl) {
    URL.revokeObjectURL(state.videoObjectUrl);
    state.videoObjectUrl = null;
  }

  state.videoReady = false;
  state.videoUploadFailed = false;
  state.videoNeedsTextureUpdate = false;
  state.videoAutoplayOnReady = false;
  resetVideoControls(false);
}

function updateVideoTexture() {
  if (state.mediaType !== "video" || !state.videoReady || state.videoUploadFailed) {
    return;
  }

  if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
    return;
  }

  if (video.paused && !state.videoNeedsTextureUpdate) {
    return;
  }

  try {
    gl.bindTexture(gl.TEXTURE_2D, state.texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
    state.videoNeedsTextureUpdate = false;
  } catch (error) {
    state.videoUploadFailed = true;
    video.pause();
    setStatus(`视频帧不能上传到 WebGL：${error.message}。如果是 URL 视频，请确认服务器允许 CORS。`, "error");
  }
}

function toggleVideoPlayback() {
  if (state.mediaType !== "video" || !state.videoReady) {
    return;
  }

  if (video.paused) {
    video.play().catch(() => {
      setStatus("浏览器阻止了自动播放，请再点一次播放按钮。", "error");
    });
  } else {
    video.pause();
  }
}

function downscaleIfNeeded(image, width, height, maxTextureSize) {
  const scale = Math.min(1, maxTextureSize / width, maxTextureSize / height);

  if (scale >= 1) {
    return {
      element: image,
      width,
      height,
      wasScaled: false,
    };
  }

  const scaledWidth = Math.max(1, Math.floor(width * scale));
  const scaledHeight = Math.max(1, Math.floor(height * scale));
  const reduced = document.createElement("canvas");
  reduced.width = scaledWidth;
  reduced.height = scaledHeight;
  const context = reduced.getContext("2d");
  context.drawImage(image, 0, 0, scaledWidth, scaledHeight);

  return {
    element: reduced,
    width: scaledWidth,
    height: scaledHeight,
    wasScaled: true,
  };
}

function initDefaultTexture() {
  const demo = document.createElement("canvas");
  demo.width = 2048;
  demo.height = 1024;

  const ctx = demo.getContext("2d");
  const sky = ctx.createLinearGradient(0, 0, 0, demo.height);
  sky.addColorStop(0, "#0a6f77");
  sky.addColorStop(0.48, "#8fc9d2");
  sky.addColorStop(0.52, "#f8d7a8");
  sky.addColorStop(1, "#1c3f36");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, demo.width, demo.height);

  ctx.fillStyle = "rgba(255, 250, 239, 0.78)";
  ctx.fillRect(0, demo.height * 0.495, demo.width, 3);

  ctx.strokeStyle = "rgba(255, 250, 239, 0.32)";
  ctx.lineWidth = 2;
  for (let x = 0; x <= demo.width; x += demo.width / 12) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, demo.height);
    ctx.stroke();
  }

  for (let y = demo.height / 8; y < demo.height; y += demo.height / 8) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(demo.width, y);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(16, 22, 29, 0.18)";
  for (let i = 0; i < 22; i += 1) {
    const x = (i * 137) % demo.width;
    const y = demo.height * 0.58 + ((i * 47) % 240);
    const w = 120 + ((i * 29) % 180);
    const h = 80 + ((i * 19) % 120);
    fillRoundedRect(ctx, x, y, w, h, 18);
  }

  ctx.fillStyle = "#fffaf1";
  ctx.font = "700 56px Avenir Next, Gill Sans, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("默认测试全景", demo.width / 2, demo.height * 0.32);
  ctx.font = "500 32px Avenir Next, Gill Sans, sans-serif";
  ctx.fillText("打开本地 2:1 图片或输入 URL 开始查看", demo.width / 2, demo.height * 0.39);

  ctx.font = "700 30px Avenir Next, Gill Sans, sans-serif";
  for (let i = 0; i < 12; i += 1) {
    const degree = i * 30;
    ctx.fillText(`${degree}°`, (i + 0.5) * (demo.width / 12), demo.height * 0.52);
  }

  state.texture = createTexture(demo);
}

function createTexture(source) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  if (anisotropyExt) {
    gl.texParameterf(gl.TEXTURE_2D, anisotropyExt.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(8, maxAnisotropy));
  }
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
  return texture;
}

function createOverlayTexture(source) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
  return texture;
}

function replaceTexture(texture) {
  if (state.texture) {
    gl.deleteTexture(state.texture);
  }

  state.texture = texture;
}

function render(time) {
  const delta = Math.min(0.05, (time - state.lastTime) / 1000);
  state.lastTime = time;

  if (autorotateInput.checked && !state.dragging) {
    state.targetYaw += delta * 0.12;
  }

  state.yaw = lerpAngle(state.yaw, state.targetYaw, 0.12);
  state.pitch += (state.targetPitch - state.pitch) * 0.12;
  state.fov += (state.targetFov - state.fov) * 0.12;

  if (state.xrSession) {
    requestAnimationFrame(render);
    return;
  }

  resizeCanvas();
  updateVideoTexture();
  drawScene({
    viewport: { x: 0, y: 0, width: canvas.width, height: canvas.height },
    projectionMatrix: perspective(degToRad(state.fov), canvas.width / Math.max(1, canvas.height), 0.01, 10),
    viewMatrix: getCurrentViewMatrix(),
    clear: true,
  });

  requestAnimationFrame(render);
}

function drawScene({ viewport, projectionMatrix, viewMatrix: sceneViewMatrix, clear = true, xrEye = 0 }) {
  gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
  if (clear) {
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.enableVertexAttribArray(locations.position);
  gl.vertexAttribPointer(locations.position, 3, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.enableVertexAttribArray(locations.texCoord);
  gl.vertexAttribPointer(locations.texCoord, 2, gl.FLOAT, false, 0, 0);

  gl.uniformMatrix4fv(locations.projection, false, projectionMatrix);
  gl.uniformMatrix4fv(locations.view, false, sceneViewMatrix);
  gl.uniform1i(locations.texture, 0);
  gl.uniform1i(locations.flipX, flipInput.checked ? 1 : 0);
  gl.uniform1i(locations.projectionMode, getProjectionMode());
  gl.uniform1i(locations.eyeMode, getEyeMode());
  gl.uniform1i(locations.xrEye, xrEye);
  gl.uniform1f(locations.flatAspect, getFlatAspectRatio());

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, state.texture);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.drawElements(gl.TRIANGLES, sphere.indices.length, gl.UNSIGNED_SHORT, 0);
}

function drawXRHudOverlay({ viewport, projectionMatrix, viewMatrix: xrViewMatrix, viewTransformMatrix, time }) {
  if (!xrHudContext) {
    return;
  }

  ensureXRPanel(viewTransformMatrix);
  updateXRHudTexture(time);

  const vertices = createXRPanelVertices();
  const mvp = multiplyMat4(projectionMatrix, xrViewMatrix);

  gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
  gl.useProgram(overlayProgram);
  gl.bindBuffer(gl.ARRAY_BUFFER, overlayBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STREAM_DRAW);

  gl.enableVertexAttribArray(overlayLocations.position);
  gl.vertexAttribPointer(overlayLocations.position, 3, gl.FLOAT, false, 20, 0);
  gl.enableVertexAttribArray(overlayLocations.texCoord);
  gl.vertexAttribPointer(overlayLocations.texCoord, 2, gl.FLOAT, false, 20, 12);
  gl.uniformMatrix4fv(overlayLocations.mvp, false, mvp);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, xrHudTexture);
  gl.uniform1i(overlayLocations.texture, 0);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  gl.disable(gl.BLEND);
}

function ensureXRPanel(viewTransformMatrix) {
  if (state.xrPanel || !viewTransformMatrix) {
    return;
  }

  const eye = [viewTransformMatrix[12], viewTransformMatrix[13], viewTransformMatrix[14]];
  const right = normalizeVec3([viewTransformMatrix[0], viewTransformMatrix[1], viewTransformMatrix[2]]);
  const up = normalizeVec3([viewTransformMatrix[4], viewTransformMatrix[5], viewTransformMatrix[6]]);
  const forward = normalizeVec3([-viewTransformMatrix[8], -viewTransformMatrix[9], -viewTransformMatrix[10]]);
  const panelWidth = 1.86;
  const panelHeight = panelWidth * (xrHudCanvas.height / xrHudCanvas.width);
  const center = addVec3(addVec3(eye, scaleVec3(forward, 2.15)), scaleVec3(up, -0.28));

  state.xrPanel = {
    center,
    right,
    up,
    normal: scaleVec3(forward, -1),
    width: panelWidth,
    height: panelHeight,
  };
}

function createXRPanelVertices() {
  const panel = state.xrPanel;

  if (!panel) {
    return new Float32Array();
  }

  const halfWidth = panel.width / 2;
  const halfHeight = panel.height / 2;
  const bottomLeft = xrPanelPointToWorld(-halfWidth, -halfHeight);
  const bottomRight = xrPanelPointToWorld(halfWidth, -halfHeight);
  const topLeft = xrPanelPointToWorld(-halfWidth, halfHeight);
  const topRight = xrPanelPointToWorld(halfWidth, halfHeight);

  return new Float32Array([
    bottomLeft[0], bottomLeft[1], bottomLeft[2], 0, 1,
    bottomRight[0], bottomRight[1], bottomRight[2], 1, 1,
    topLeft[0], topLeft[1], topLeft[2], 0, 0,
    topRight[0], topRight[1], topRight[2], 1, 0,
  ]);
}

function xrPanelPointToWorld(x, y) {
  const panel = state.xrPanel;
  return addVec3(panel.center, addVec3(scaleVec3(panel.right, x), scaleVec3(panel.up, y)));
}

function updateXRHudTexture(time) {
  const updateInterval = state.mediaType === "video" && state.videoReady && !video.paused ? 180 : 500;

  if (!state.xrHudDirty && time - state.xrHudLastUpdate < updateInterval) {
    return;
  }

  drawXRHudCanvas();
  gl.bindTexture(gl.TEXTURE_2D, xrHudTexture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, xrHudCanvas);
  state.xrHudDirty = false;
  state.xrHudLastUpdate = time;
}

function drawXRHudCanvas() {
  const ctx = xrHudContext;
  const width = xrHudCanvas.width;
  const height = xrHudCanvas.height;
  const mediaName = getMediaDisplayName();
  const projectionLabel = projectionSelect.selectedOptions[0]
    ? projectionSelect.selectedOptions[0].textContent
    : state.projection;
  const sourceWidth = state.mediaInfo && state.mediaInfo.width;
  const sourceHeight = state.mediaInfo && state.mediaInfo.height;
  const resolution = sourceWidth && sourceHeight ? `${sourceWidth}×${sourceHeight}` : "-";
  const speed = speedInput.selectedOptions[0] ? speedInput.selectedOptions[0].textContent : `${video.playbackRate || 1}×`;
  const modeLabel = state.mediaType === "video" ? t("xrHudVideo") : t("xrHudImageMode");
  const playLabel = state.mediaType === "video" && state.videoReady
    ? (video.paused ? t("xrHudPaused") : t("xrHudPlaying"))
    : t("xrHudNoProgress");
  const playButtonLabel = video.paused ? t("playVideo") : t("pauseVideo");

  state.xrPanelElements = [];

  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.34)";
  ctx.shadowBlur = 28;
  ctx.shadowOffsetY = 10;
  ctx.fillStyle = "rgba(4, 13, 17, 0.82)";
  fillRoundedRect(ctx, 22, 20, width - 44, height - 40, 32);
  ctx.restore();

  ctx.fillStyle = "rgba(255, 250, 239, 0.10)";
  fillRoundedRect(ctx, 48, 82, width - 96, 96, 24);
  ctx.fillStyle = "rgba(255, 250, 239, 0.08)";
  fillRoundedRect(ctx, 48, 198, width - 96, 94, 24);
  ctx.fillStyle = "rgba(255, 250, 239, 0.08)";
  fillRoundedRect(ctx, 48, 310, width - 96, 68, 24);

  ctx.fillStyle = "#fffaf1";
  ctx.font = "800 34px Avenir Next, Gill Sans, Trebuchet MS, sans-serif";
  ctx.textBaseline = "alphabetic";
  drawTruncatedText(ctx, t("xrHudTitle"), 56, 56, 520);

  drawXRHudButton("exit", t("xrHudExit"), width - 214, 28, 158, 48, true);

  ctx.fillStyle = "rgba(255, 250, 239, 0.84)";
  ctx.font = "800 27px Avenir Next, Gill Sans, Trebuchet MS, sans-serif";
  drawTruncatedText(ctx, mediaName, 68, 124, width - 136);

  ctx.fillStyle = "rgba(255, 250, 239, 0.66)";
  ctx.font = "700 21px Avenir Next, Gill Sans, Trebuchet MS, sans-serif";
  drawTruncatedText(ctx, `${t("xrHudFov")}: ${Math.round(state.targetFov)}°`, 68, 160, 170);
  drawTruncatedText(ctx, `${t("xrHudResolution")}: ${resolution}`, 260, 160, 270);
  drawXRHudPill(modeLabel, width - 232, 132, 164, 38, modeLabel === t("xrHudVideo"));

  ctx.fillStyle = "rgba(255, 250, 239, 0.72)";
  ctx.font = "800 22px Avenir Next, Gill Sans, Trebuchet MS, sans-serif";
  ctx.fillText(t("xrHudProjection"), 68, 228);
  drawXRHudButton("projection-prev", t("xrHudPrevProjection"), 68, 238, 132, 46, false);
  drawXRHudSelection(projectionLabel, 216, 238, 592, 46);
  drawXRHudButton("projection-next", t("xrHudNextProjection"), 824, 238, 132, 46, false);

  const muteLabel = muteInput.checked ? t("xrHudMuteOn") : t("xrHudMuteOff");
  const loopLabel = loopInput.checked ? t("xrHudLoopOn") : t("xrHudLoopOff");
  drawXRHudButton("play-pause", playButtonLabel, 68, 322, 154, 46, state.mediaType === "video" && state.videoReady && !video.paused);
  drawXRHudPill(playLabel, 238, 322, 150, 46, state.mediaType === "video" && state.videoReady && !video.paused);
  drawXRHudPill(muteLabel, 404, 322, 118, 46, !muteInput.checked);
  drawXRHudPill(loopLabel, 538, 322, 118, 46, loopInput.checked);
  drawXRHudPill(speed, 672, 322, 96, 46, false);

  drawXRHudProgress(68, 432, width - 136, 28);

  ctx.fillStyle = "rgba(255, 250, 239, 0.46)";
  ctx.font = "700 18px Avenir Next, Gill Sans, Trebuchet MS, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(t("xrHudTriggerHint"), width / 2, 494);
  ctx.textAlign = "start";
}

function drawXRHudPill(text, x, y, width, height, active) {
  const ctx = xrHudContext;
  ctx.fillStyle = active ? "rgba(229, 95, 42, 0.88)" : "rgba(255, 250, 239, 0.14)";
  fillRoundedRect(ctx, x, y, width, height, height / 2);
  ctx.fillStyle = active ? "#fffaf1" : "rgba(255, 250, 239, 0.78)";
  ctx.font = "800 20px Avenir Next, Gill Sans, Trebuchet MS, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  drawTruncatedText(ctx, text, x + width / 2, y + height / 2 + 1, width - 24, "center");
  ctx.textAlign = "start";
  ctx.textBaseline = "alphabetic";
}

function drawXRHudButton(id, text, x, y, width, height, active) {
  registerXRPanelElement(id, x, y, width, height);
  const ctx = xrHudContext;
  const pressed = state.xrPanelActiveId === id;
  ctx.fillStyle = pressed
    ? "rgba(255, 250, 239, 0.92)"
    : active ? "rgba(229, 95, 42, 0.90)" : "rgba(255, 250, 239, 0.16)";
  fillRoundedRect(ctx, x, y, width, height, height / 2);
  ctx.fillStyle = pressed ? "#10161d" : "#fffaf1";
  ctx.font = "800 20px Avenir Next, Gill Sans, Trebuchet MS, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  drawTruncatedText(ctx, text, x + width / 2, y + height / 2 + 1, width - 24, "center");
  ctx.textAlign = "start";
  ctx.textBaseline = "alphabetic";
}

function drawXRHudSelection(text, x, y, width, height) {
  const ctx = xrHudContext;
  ctx.fillStyle = "rgba(255, 250, 239, 0.12)";
  fillRoundedRect(ctx, x, y, width, height, 18);
  ctx.strokeStyle = "rgba(255, 250, 239, 0.18)";
  ctx.lineWidth = 2;
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(x + 1, y + 1, width - 2, height - 2, 18);
    ctx.stroke();
  }
  ctx.fillStyle = "rgba(255, 250, 239, 0.88)";
  ctx.font = "800 21px Avenir Next, Gill Sans, Trebuchet MS, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  drawTruncatedText(ctx, text, x + width / 2, y + height / 2 + 1, width - 32, "center");
  ctx.textAlign = "start";
  ctx.textBaseline = "alphabetic";
}

function drawXRHudProgress(x, y, width, height) {
  const ctx = xrHudContext;
  const duration = state.mediaType === "video" && state.videoReady && isFiniteDuration(video.duration) ? video.duration : 0;
  const current = state.mediaType === "video" && state.videoReady ? video.currentTime || 0 : 0;
  const progress = duration ? clamp(current / duration, 0, 1) : 0;
  const timeText = state.mediaType === "video" && state.videoReady
    ? `${formatTime(current)} / ${duration ? formatTime(duration) : t("xrHudUnknownDuration")}`
    : t("xrHudNoProgress");

  ctx.fillStyle = "rgba(255, 250, 239, 0.74)";
  ctx.font = "800 22px Avenir Next, Gill Sans, Trebuchet MS, sans-serif";
  ctx.textAlign = "start";
  ctx.fillText(t("xrHudProgress"), x, y - 16);
  ctx.textAlign = "right";
  ctx.fillText(timeText, x + width, y - 16);

  ctx.fillStyle = "rgba(255, 250, 239, 0.18)";
  fillRoundedRect(ctx, x, y, width, height, height / 2);
  ctx.fillStyle = state.mediaType === "video" ? "rgba(229, 95, 42, 0.92)" : "rgba(143, 201, 210, 0.58)";
  fillRoundedRect(ctx, x, y, Math.max(height, width * progress), height, height / 2);
  registerXRPanelElement("progress", x, y - 18, width, height + 36);

  if (duration) {
    ctx.fillStyle = "#fffaf1";
    ctx.beginPath();
    ctx.arc(x + width * progress, y + height / 2, 16, 0, Math.PI * 2);
    ctx.fill();
  }
}

function registerXRPanelElement(id, x, y, width, height) {
  state.xrPanelElements.push({ id, x, y, width, height });
}

function drawTruncatedText(ctx, text, x, y, maxWidth, align = "start") {
  const originalAlign = ctx.textAlign;
  ctx.textAlign = align;

  if (ctx.measureText(text).width <= maxWidth) {
    ctx.fillText(text, x, y);
    ctx.textAlign = originalAlign;
    return;
  }

  let clipped = text;
  while (clipped.length > 1 && ctx.measureText(`${clipped}...`).width > maxWidth) {
    clipped = clipped.slice(0, -1);
  }

  ctx.fillText(`${clipped}...`, x, y);
  ctx.textAlign = originalAlign;
}

function getMediaDisplayName() {
  if (!state.mediaInfo) {
    return t("defaultStatus");
  }

  const value = state.mediaInfo.sourceName || state.mediaInfo.label || "";

  try {
    const parsed = new URL(value, window.location.href);
    const lastSegment = parsed.pathname.split("/").filter(Boolean).pop();
    return lastSegment || parsed.hostname || value;
  } catch {
    return value.replace(/^本地图片：|^本地视频：|^URL 图片：|^URL 视频：/, "");
  }
}

function markXRHudDirty() {
  state.xrHudDirty = true;
}

function getCurrentViewMatrix() {
  if (state.gyroEnabled && state.gyroMatrix) {
    return multiplyMat4(viewMatrix(state.gyroYawOffset, state.gyroPitchOffset), state.gyroMatrix);
  }

  return viewMatrix(state.yaw, state.pitch);
}

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const displayWidth = Math.max(1, Math.floor(canvas.clientWidth * dpr));
  const displayHeight = Math.max(1, Math.floor(canvas.clientHeight * dpr));

  if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }
}

function resetView() {
  if (state.gyroEnabled) {
    state.gyroYawOffset = 0;
    state.gyroPitchOffset = 0;
  } else {
    state.targetYaw = 0;
    state.targetPitch = 0;
  }

  setZoom(72);
  setStatus("视角已重置。", "success");
}

function setZoom(value) {
  state.targetFov = clamp(value, limits.minFov, limits.maxFov);
  zoomInput.value = String(Math.round(state.targetFov));
  zoomValue.textContent = `${Math.round(state.targetFov)}°`;
  markXRHudDirty();
}

function toggleFullscreen() {
  const target = document.querySelector(".viewer-card");

  if (!document.fullscreenElement) {
    if (!target.requestFullscreen) {
      setStatus("这个浏览器暂时不支持全屏 API。", "error");
      return;
    }

    target.requestFullscreen().catch(() => {
      setStatus("浏览器没有允许进入全屏。", "error");
    });
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

function enterFullscreenOnLoad() {
  if (!state.fullscreenOnLoad || state.fullscreenRequested || document.fullscreenElement) {
    return;
  }

  state.fullscreenRequested = true;
  const target = document.querySelector(".viewer-card");

  if (!target.requestFullscreen) {
    setStatus("当前浏览器不支持自动全屏。", "error");
    return;
  }

  target.requestFullscreen().catch(() => {
    setStatus("浏览器阻止了自动全屏，请手动点击全屏按钮。", "error");
  });
}

function checkGyroSupport() {
  state.gyroSupported = "DeviceOrientationEvent" in window;
  gyroButton.disabled = !state.gyroSupported;
  gyroButton.title = state.gyroSupported
    ? "开启手机陀螺仪视角"
    : "当前浏览器不支持设备方向传感器";
}

async function toggleGyro() {
  if (state.gyroEnabled) {
    disableGyro("已关闭陀螺仪视角。");
    return;
  }

  if (!state.gyroSupported) {
    setStatus("当前浏览器不支持设备方向传感器。", "error");
    return;
  }

  try {
    if (!state.gyroPermissionGranted && typeof DeviceOrientationEvent.requestPermission === "function") {
      const permission = await DeviceOrientationEvent.requestPermission();

      if (permission !== "granted") {
        setStatus("没有获得陀螺仪权限。iPhone 上需要点允许，且通常要 HTTPS 页面。", "error");
        return;
      }
    }

    state.gyroPermissionGranted = true;
    state.gyroEnabled = true;
    state.gyroMatrix = null;
    state.gyroYawOffset = state.targetYaw;
    state.gyroPitchOffset = state.targetPitch;
    autorotateInput.checked = false;
    window.addEventListener("deviceorientation", handleDeviceOrientation, true);
    updateGyroButton();
    setStatus("已开启陀螺仪视角。转动手机即可环视，单指拖拽可微调方向。", "success");
  } catch (error) {
    setStatus(`无法开启陀螺仪：${error.message}`, "error");
  }
}

function disableGyro(message) {
  state.gyroEnabled = false;
  state.gyroMatrix = null;
  window.removeEventListener("deviceorientation", handleDeviceOrientation, true);
  updateGyroButton();
  setStatus(message, "success");
}

function updateGyroButton() {
  gyroButton.textContent = state.gyroEnabled ? t("gyroOff") : t("gyro");
  gyroButton.classList.toggle("is-active", state.gyroEnabled);
}

function handleDeviceOrientation(event) {
  if (!state.gyroEnabled || event.alpha === null || event.beta === null || event.gamma === null) {
    return;
  }

  state.gyroMatrix = deviceOrientationMatrix(
    degToRad(event.alpha || 0),
    degToRad(event.beta || 0),
    degToRad(event.gamma || 0),
    degToRad(getScreenOrientation())
  );
}

function getScreenOrientation() {
  if (screen.orientation && Number.isFinite(screen.orientation.angle)) {
    return screen.orientation.angle;
  }

  return window.orientation || 0;
}

async function checkXRSupport() {
  if (!navigator.xr || !gl.makeXRCompatible) {
    xrButton.disabled = true;
    xrButton.title = "当前浏览器或设备不支持 WebXR";
    return;
  }

  try {
    const supported = await navigator.xr.isSessionSupported("immersive-vr");
    xrButton.disabled = !supported;
    xrButton.title = supported ? "进入 WebXR 沉浸式观看" : "没有检测到可用的沉浸式 VR 设备";
  } catch {
    xrButton.disabled = true;
    xrButton.title = "无法检测 WebXR 支持";
  }
}

function updateXRButtonText() {
  xrButton.textContent = state.xrSession ? t("exitXr") : t("enterXr");
}

async function toggleXR() {
  if (state.xrSession) {
    await state.xrSession.end();
    return;
  }

  if (!navigator.xr || !gl.makeXRCompatible) {
    setStatus("当前浏览器不支持 WebXR。请使用支持 WebXR 的浏览器和设备。", "error");
    return;
  }

  try {
    if (!state.xrCompatibleReady) {
      await gl.makeXRCompatible();
      state.xrCompatibleReady = true;
    }

    const session = await navigator.xr.requestSession("immersive-vr", {
      optionalFeatures: ["local-floor", "bounded-floor"],
    });

    state.xrSession = session;
    state.xrBaseLayer = createXRBaseLayer(session);
    session.updateRenderState({ baseLayer: state.xrBaseLayer });
    state.xrReferenceSpace = await session.requestReferenceSpace("local");
    state.xrPanel = null;
    state.xrPanelActiveId = "";
    state.xrPanelDrag = null;
    updateXRButtonText();
    setStatus(`已进入 WebXR 沉浸式模式。${getXRResolutionHint(state.xrBaseLayer)}`, "success");

    session.addEventListener("selectstart", handleXRSelectStart);
    session.addEventListener("selectend", handleXRSelectEnd);

    session.addEventListener("end", () => {
      session.removeEventListener("selectstart", handleXRSelectStart);
      session.removeEventListener("selectend", handleXRSelectEnd);
      state.xrSession = null;
      state.xrReferenceSpace = null;
      state.xrBaseLayer = null;
      state.xrPanel = null;
      state.xrPanelActiveId = "";
      state.xrPanelDrag = null;
      updateXRButtonText();
      resizeCanvas();
      setStatus("已退出 WebXR。", "success");
    });

    session.requestAnimationFrame(renderXRFrame);
  } catch (error) {
    setStatus(`无法进入 WebXR：${error.message}`, "error");
  }
}

function createXRBaseLayer(session) {
  const scale = getRequestedXRFramebufferScale(session);

  if (!Number.isFinite(scale) || scale <= 0) {
    return new XRWebGLLayer(session, gl);
  }

  try {
    return new XRWebGLLayer(session, gl, {
      antialias: true,
      alpha: false,
      framebufferScaleFactor: scale,
    });
  } catch {
    return new XRWebGLLayer(session, gl);
  }
}

function getRequestedXRFramebufferScale(session) {
  const selected = xrScaleSelect.value;
  const nativeScale = typeof XRWebGLLayer.getNativeFramebufferScaleFactor === "function"
    ? XRWebGLLayer.getNativeFramebufferScaleFactor(session)
    : 1;

  if (selected === "native") {
    return nativeScale || 1;
  }

  const requestedScale = Number(selected);
  if (!Number.isFinite(requestedScale)) {
    return nativeScale || 1;
  }

  return requestedScale;
}

function getXRResolutionHint(baseLayer) {
  if (!baseLayer || !baseLayer.framebufferWidth || !baseLayer.framebufferHeight) {
    return " 如果觉得糊，可把 XR 清晰度调到增强或超清。";
  }

  return `当前 XR framebuffer：${baseLayer.framebufferWidth}×${baseLayer.framebufferHeight}。如果卡顿，可降低 XR 清晰度。`;
}

function handleXRSelectStart(event) {
  const hit = getXRPanelHit(event.inputSource, event.frame);

  if (!hit || !hit.element) {
    return;
  }

  state.xrPanelActiveId = hit.element.id;
  markXRHudDirty();

  if (hit.element.id === "progress") {
    if (state.mediaType === "video" && state.videoReady && isFiniteDuration(video.duration)) {
      state.xrPanelDrag = { inputSource: event.inputSource };
      seekVideoFromXRPanel(hit.canvasX);
    }
    return;
  }

  runXRPanelAction(hit.element.id);
}

function handleXRSelectEnd(event) {
  if (state.xrPanelDrag && state.xrPanelDrag.inputSource === event.inputSource) {
    const hit = getXRPanelHit(event.inputSource, event.frame);

    if (hit) {
      seekVideoFromXRPanel(hit.canvasX);
    }

    state.timelineSeeking = false;
    state.xrPanelDrag = null;
    updateTimeline();
  }

  state.xrPanelActiveId = "";
  markXRHudDirty();
}

function updateXRPanelDrag(frame) {
  if (!state.xrPanelDrag) {
    return;
  }

  const hit = getXRPanelHit(state.xrPanelDrag.inputSource, frame);

  if (hit) {
    seekVideoFromXRPanel(hit.canvasX);
  }
}

function runXRPanelAction(id) {
  if (id === "exit") {
    if (state.xrSession) {
      state.xrSession.end();
    }
  } else if (id === "play-pause") {
    toggleVideoPlayback();
  } else if (id === "projection-prev") {
    cycleProjection(-1);
  } else if (id === "projection-next") {
    cycleProjection(1);
  }
}

function cycleProjection(direction) {
  const options = Array.from(projectionSelect.options);
  const currentIndex = Math.max(0, options.findIndex((option) => option.value === state.projection));
  const nextIndex = (currentIndex + direction + options.length) % options.length;
  const option = options[nextIndex];

  applyProjection(option.value, true);
  setStatus(`投影格式已切换为：${option.textContent}。`, "success");
}

function seekVideoFromXRPanel(canvasX) {
  if (state.mediaType !== "video" || !state.videoReady || !isFiniteDuration(video.duration)) {
    return;
  }

  const progressElement = state.xrPanelElements.find((element) => element.id === "progress");

  if (!progressElement) {
    return;
  }

  const progress = clamp((canvasX - progressElement.x) / progressElement.width, 0, 1);
  state.timelineSeeking = true;
  video.currentTime = video.duration * progress;
  viewerTimelineInput.value = String(Math.round(progress * Number(viewerTimelineInput.max)));
  state.videoNeedsTextureUpdate = true;
  updateTimeline();
  markXRHudDirty();
}

function getXRPanelHit(inputSource, frame) {
  if (!state.xrPanel || !state.xrReferenceSpace || !inputSource || !inputSource.targetRaySpace || !frame) {
    return null;
  }

  const pose = frame.getPose(inputSource.targetRaySpace, state.xrReferenceSpace);

  if (!pose) {
    return null;
  }

  const matrix = pose.transform.matrix;
  const origin = [matrix[12], matrix[13], matrix[14]];
  const direction = normalizeVec3([-matrix[8], -matrix[9], -matrix[10]]);
  const hit = getXRPanelRayHit(origin, direction);

  if (!hit) {
    return null;
  }

  return {
    ...hit,
    element: getXRPanelElementAt(hit.canvasX, hit.canvasY),
  };
}

function getXRPanelRayHit(origin, direction) {
  const panel = state.xrPanel;
  const denominator = dotVec3(direction, panel.normal);

  if (Math.abs(denominator) < 0.0001) {
    return null;
  }

  const distance = dotVec3(subtractVec3(panel.center, origin), panel.normal) / denominator;

  if (distance < 0) {
    return null;
  }

  const worldPoint = addVec3(origin, scaleVec3(direction, distance));
  const offset = subtractVec3(worldPoint, panel.center);
  const localX = dotVec3(offset, panel.right);
  const localY = dotVec3(offset, panel.up);

  if (Math.abs(localX) > panel.width / 2 || Math.abs(localY) > panel.height / 2) {
    return null;
  }

  return {
    canvasX: (localX / panel.width + 0.5) * xrHudCanvas.width,
    canvasY: (0.5 - localY / panel.height) * xrHudCanvas.height,
  };
}

function getXRPanelElementAt(canvasX, canvasY) {
  for (let index = state.xrPanelElements.length - 1; index >= 0; index -= 1) {
    const element = state.xrPanelElements[index];

    if (canvasX >= element.x && canvasX <= element.x + element.width
      && canvasY >= element.y && canvasY <= element.y + element.height) {
      return element;
    }
  }

  return null;
}

function renderXRFrame(time, frame) {
  const session = frame.session;
  const pose = frame.getViewerPose(state.xrReferenceSpace);
  state.lastTime = time;

  updateVideoTexture();
  updateXRPanelDrag(frame);

  if (pose) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, state.xrBaseLayer.framebuffer);
    gl.clear(gl.COLOR_BUFFER_BIT);

    pose.views.forEach((view) => {
      const viewport = state.xrBaseLayer.getViewport(view);
      drawScene({
        viewport,
        projectionMatrix: view.projectionMatrix,
        viewMatrix: makeInsideSphereXRViewMatrix(view.transform.inverse.matrix),
        clear: false,
        xrEye: view.eye === "right" ? 1 : 0,
      });
      drawXRHudOverlay({
        viewport,
        projectionMatrix: view.projectionMatrix,
        viewMatrix: view.transform.inverse.matrix,
        viewTransformMatrix: view.transform.matrix,
        time,
      });
    });
  }

  session.requestAnimationFrame(renderXRFrame);
}

function makeInsideSphereXRViewMatrix(viewMatrixValues) {
  const matrix = new Float32Array(viewMatrixValues);
  matrix[12] = 0;
  matrix[13] = 0;
  matrix[14] = 0;
  return matrix;
}

function setStatus(message, type) {
  statusEl.textContent = message;
  statusEl.classList.toggle("is-error", type === "error");
  statusEl.classList.toggle("is-success", type === "success");
  markXRHudDirty();
}

function setProjectionFromSource(width, height, sourceName) {
  if (state.projectionTouched) {
    return;
  }

  const ratio = width / height;
  const normalizedName = `${state.projectionHint} ${normalizeProjectionName(sourceName)}`.trim();
  const isSquare = isRatioNear(ratio, 1);
  const isWide360 = isRatioNear(ratio, 2);
  let nextProjection = getForcedProjectionFromKeyword(normalizedName) || "flat";

  if (nextProjection !== "flat") {
    // Explicit projection keywords ignore aspect ratio.
  } else if (hasProjectionKeyword(normalizedName, ["_EAC", " EAC", "-EAC", ".EAC"])) {
    nextProjection = "eac";
  } else if (hasProjectionKeyword(normalizedName, ["_SBS", "_3D", "_LR", " SBS", " 3D", " LR", "-SBS", "-3D", "-LR"])) {
    nextProjection = "flat-sbs";
  } else if (hasProjectionKeyword(normalizedName, ["_TD", " TD", "-TD"])) {
    nextProjection = "flat-tb";
  } else if (normalizedName.includes("VR180")) {
    nextProjection = isSquare ? "vr180" : "vr180-sbs";
  } else if (normalizedName.includes("VR360") || normalizedName.includes("_360")) {
    nextProjection = isSquare ? "erp360-tb" : "erp360";
  } else if (isWide360) {
    nextProjection = "erp360";
  }

  applyProjection(nextProjection, false);
}

function applyProjection(projection, touched) {
  state.projection = projection;
  projectionSelect.value = projection;
  markXRHudDirty();

  if (touched) {
    state.projectionTouched = true;
  }
}

function getForcedProjectionFromKeyword(value) {
  const normalized = normalizeProjectionName(value).toUpperCase().replace(/[\s_-]+/g, "");

  if (!normalized) {
    return "";
  }

  if (normalized.includes("VR1803D") || normalized.includes("1803D")) {
    return "vr180-sbs";
  }

  if (normalized.includes("VR1802D") || normalized.includes("1802D")) {
    return "vr180";
  }

  if (normalized.includes("VR360OU") || normalized.includes("VR3603D") || normalized.includes("ERP3D") || normalized.includes("3603D")) {
    return "erp360-tb";
  }

  if (normalized.includes("ERP") || normalized.includes("3602D")) {
    return "erp360";
  }

  if (hasProjectionKeyword(value, ["_OU", " OU", "-OU"])) {
    return "erp360-tb";
  }

  return "";
}

function isTruthyQueryValue(value) {
  if (value === null) {
    return false;
  }

  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

function normalizeProjectionName(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function hasProjectionKeyword(name, keywords) {
  const upperName = name.toUpperCase();
  return keywords.some((keyword) => upperName.includes(keyword));
}

function isRatioNear(value, target) {
  return Math.abs(value - target) < 0.08;
}

function getProjectionMode() {
  if (state.projection === "vr180" || state.projection === "vr180-sbs") {
    return 1;
  }

  if (state.projection === "flat" || state.projection === "flat-sbs" || state.projection === "flat-tb") {
    return 2;
  }

  if (state.projection === "eac" || state.projection === "eac-tb") {
    return 3;
  }

  return 0;
}

function getEyeMode() {
  if (state.projection === "erp360-tb" || state.projection === "eac-tb" || state.projection === "flat-tb") {
    return 1;
  }

  if (state.projection === "vr180-sbs" || state.projection === "flat-sbs") {
    return 2;
  }

  return 0;
}

function getFlatAspectRatio() {
  if (!state.mediaInfo || !state.mediaInfo.width || !state.mediaInfo.height) {
    return 16 / 9;
  }

  let width = state.mediaInfo.uploadedWidth || state.mediaInfo.width;
  let height = state.mediaInfo.uploadedHeight || state.mediaInfo.height;

  if (state.projection === "flat-sbs") {
    width /= 2;
  } else if (state.projection === "flat-tb") {
    height /= 2;
  }

  return clamp(width / Math.max(1, height), 0.1, 10);
}

function getImmersiveSourceQualityHint(width, height) {
  const immersiveProjection = state.projection === "erp360"
    || state.projection === "erp360-tb"
    || state.projection === "vr180"
    || state.projection === "vr180-sbs"
    || state.projection === "eac"
    || state.projection === "eac-tb";

  if (!immersiveProjection) {
    return "";
  }

  const effectiveWidth = (state.projection === "vr180-sbs") ? width / 2 : width;
  const effectiveHeight = (state.projection === "erp360-tb" || state.projection === "eac-tb") ? height / 2 : height;

  if (effectiveWidth < 3840 || effectiveHeight < 1920) {
    return " 头显提示：这个素材的单眼有效分辨率偏低，沉浸式观看可能会显得糊。";
  }

  return "";
}

function guessMediaTypeFromUrl(url) {
  const cleanUrl = url.split("?")[0].split("#")[0].toLowerCase();

  if (/\.(mp4|m4v|webm|mov|ogv|ogg)$/.test(cleanUrl)) {
    return "video";
  }

  if (/\.(jpg|jpeg|png|webp|gif|avif|bmp)$/.test(cleanUrl)) {
    return "image";
  }

  return "";
}

function getFileMediaType(file) {
  if (file.type.startsWith("video/")) {
    return "video";
  }

  if (file.type.startsWith("image/")) {
    return "image";
  }

  return guessMediaTypeFromUrl(file.name);
}

function resetVideoControls(enabled) {
  viewerPlayButton.disabled = !enabled;
  viewerTimelineInput.disabled = !enabled;
  viewerTimelineInput.value = "0";
  viewerCurrentTimeEl.textContent = "0:00";
  viewerDurationTimeEl.textContent = "0:00";
  document.querySelector("#viewerProgress").classList.toggle("is-visible", enabled);
  viewerPlayButton.classList.toggle("is-visible", enabled);
  updatePlaybackButton();
}

function updatePlaybackButton() {
  viewerPlayButton.classList.toggle("is-playing", !video.paused);
  viewerPlayButton.setAttribute("aria-label", video.paused ? t("playVideo") : t("pauseVideo"));
  markXRHudDirty();
}

function updateTimeline() {
  if (state.mediaType !== "video" || !state.videoReady) {
    return;
  }

  const duration = isFiniteDuration(video.duration) ? video.duration : 0;
  const current = Math.min(video.currentTime || 0, duration || video.currentTime || 0);

  viewerCurrentTimeEl.textContent = formatTime(current);
  viewerDurationTimeEl.textContent = duration ? formatTime(duration) : "直播/未知";

  if (!state.timelineSeeking && duration) {
    const value = String(Math.round((current / duration) * Number(viewerTimelineInput.max)));
    viewerTimelineInput.value = value;
  }

  markXRHudDirty();
}

function formatTime(value) {
  if (!Number.isFinite(value) || value < 0) {
    return "0:00";
  }

  const totalSeconds = Math.floor(value);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const paddedSeconds = String(seconds).padStart(2, "0");

  if (hours) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${paddedSeconds}`;
  }

  return `${minutes}:${paddedSeconds}`;
}

function isFiniteDuration(duration) {
  return Number.isFinite(duration) && duration > 0;
}

function getVideoErrorMessage(error) {
  const messages = {
    1: "视频载入已取消。",
    2: "网络错误导致视频载入失败。",
    3: "视频解码失败，可能编码格式不受浏览器支持。",
    4: "这个视频格式或 URL 不受浏览器支持。",
  };

  return messages[error.code] || "视频载入失败。";
}

function createProgram(context, vertexSource, fragmentSource) {
  const vertexShader = compileShader(context, context.VERTEX_SHADER, vertexSource);
  const fragmentShader = compileShader(context, context.FRAGMENT_SHADER, fragmentSource);
  const shaderProgram = context.createProgram();

  context.attachShader(shaderProgram, vertexShader);
  context.attachShader(shaderProgram, fragmentShader);
  context.linkProgram(shaderProgram);

  if (!context.getProgramParameter(shaderProgram, context.LINK_STATUS)) {
    const log = context.getProgramInfoLog(shaderProgram);
    context.deleteProgram(shaderProgram);
    throw new Error(`WebGL 程序链接失败：${log}`);
  }

  return shaderProgram;
}

function compileShader(context, type, source) {
  const shader = context.createShader(type);
  context.shaderSource(shader, source);
  context.compileShader(shader);

  if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
    const log = context.getShaderInfoLog(shader);
    context.deleteShader(shader);
    throw new Error(`WebGL 着色器编译失败：${log}`);
  }

  return shader;
}

function createArrayBuffer(context, data) {
  const buffer = context.createBuffer();
  context.bindBuffer(context.ARRAY_BUFFER, buffer);
  context.bufferData(context.ARRAY_BUFFER, data, context.STATIC_DRAW);
  return buffer;
}

function hasFileDrag(event) {
  const types = event.dataTransfer && Array.from(event.dataTransfer.types || []);
  return types.includes("Files");
}

function fillRoundedRect(context, x, y, width, height, radius) {
  if (context.roundRect) {
    context.beginPath();
    context.roundRect(x, y, width, height, radius);
    context.fill();
    return;
  }

  const r = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.lineTo(x + width - r, y);
  context.quadraticCurveTo(x + width, y, x + width, y + r);
  context.lineTo(x + width, y + height - r);
  context.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  context.lineTo(x + r, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - r);
  context.lineTo(x, y + r);
  context.quadraticCurveTo(x, y, x + r, y);
  context.fill();
}

function createSphere(rings, segments) {
  const positions = [];
  const texCoords = [];
  const indices = [];

  for (let ring = 0; ring <= rings; ring += 1) {
    const v = ring / rings;
    const theta = v * Math.PI;
    const y = Math.cos(theta);
    const radius = Math.sin(theta);

    for (let segment = 0; segment <= segments; segment += 1) {
      const u = segment / segments;
      const phi = u * Math.PI * 2;
      const x = -Math.sin(phi) * radius;
      const z = Math.cos(phi) * radius;
      positions.push(x, y, z);
      texCoords.push(u, v);
    }
  }

  for (let ring = 0; ring < rings; ring += 1) {
    for (let segment = 0; segment < segments; segment += 1) {
      const first = ring * (segments + 1) + segment;
      const second = first + segments + 1;
      indices.push(first, second, first + 1);
      indices.push(second, second + 1, first + 1);
    }
  }

  return {
    positions: new Float32Array(positions),
    texCoords: new Float32Array(texCoords),
    indices: new Uint16Array(indices),
  };
}

function perspective(fov, aspect, near, far) {
  const f = 1 / Math.tan(fov / 2);
  const nf = 1 / (near - far);

  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * nf, -1,
    0, 0, (2 * far * near) * nf, 0,
  ]);
}

function viewMatrix(yaw, pitch) {
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);

  return new Float32Array([
    cy, sy * sp, sy * cp, 0,
    0, cp, -sp, 0,
    -sy, cy * sp, cy * cp, 0,
    0, 0, 0, 1,
  ]);
}

function deviceOrientationMatrix(alpha, beta, gamma, orient) {
  const zee = [0, 0, 1];
  const q0 = quatFromAxisAngle([1, 0, 0], -Math.PI / 2);
  const q1 = quatFromAxisAngle(zee, -orient);
  const eulerQuat = quatFromEuler(beta, alpha, -gamma, "YXZ");
  const cameraQuat = quatMultiply(quatMultiply(eulerQuat, q0), q1);
  return quatToMat4(quatConjugate(cameraQuat));
}

function quatFromEuler(x, y, z, order) {
  const c1 = Math.cos(x / 2);
  const c2 = Math.cos(y / 2);
  const c3 = Math.cos(z / 2);
  const s1 = Math.sin(x / 2);
  const s2 = Math.sin(y / 2);
  const s3 = Math.sin(z / 2);

  if (order === "YXZ") {
    return [
      s1 * c2 * c3 + c1 * s2 * s3,
      c1 * s2 * c3 - s1 * c2 * s3,
      c1 * c2 * s3 - s1 * s2 * c3,
      c1 * c2 * c3 + s1 * s2 * s3,
    ];
  }

  return [0, 0, 0, 1];
}

function quatFromAxisAngle(axis, angle) {
  const halfAngle = angle / 2;
  const scale = Math.sin(halfAngle);
  return [
    axis[0] * scale,
    axis[1] * scale,
    axis[2] * scale,
    Math.cos(halfAngle),
  ];
}

function quatMultiply(a, b) {
  const ax = a[0];
  const ay = a[1];
  const az = a[2];
  const aw = a[3];
  const bx = b[0];
  const by = b[1];
  const bz = b[2];
  const bw = b[3];

  return [
    ax * bw + aw * bx + ay * bz - az * by,
    ay * bw + aw * by + az * bx - ax * bz,
    az * bw + aw * bz + ax * by - ay * bx,
    aw * bw - ax * bx - ay * by - az * bz,
  ];
}

function quatConjugate(q) {
  return [-q[0], -q[1], -q[2], q[3]];
}

function quatToMat4(q) {
  const x = q[0];
  const y = q[1];
  const z = q[2];
  const w = q[3];
  const x2 = x + x;
  const y2 = y + y;
  const z2 = z + z;
  const xx = x * x2;
  const xy = x * y2;
  const xz = x * z2;
  const yy = y * y2;
  const yz = y * z2;
  const zz = z * z2;
  const wx = w * x2;
  const wy = w * y2;
  const wz = w * z2;

  return new Float32Array([
    1 - (yy + zz), xy + wz, xz - wy, 0,
    xy - wz, 1 - (xx + zz), yz + wx, 0,
    xz + wy, yz - wx, 1 - (xx + yy), 0,
    0, 0, 0, 1,
  ]);
}

function multiplyMat4(a, b) {
  const result = new Float32Array(16);

  for (let column = 0; column < 4; column += 1) {
    for (let row = 0; row < 4; row += 1) {
      result[column * 4 + row] =
        a[row] * b[column * 4]
        + a[4 + row] * b[column * 4 + 1]
        + a[8 + row] * b[column * 4 + 2]
        + a[12 + row] * b[column * 4 + 3];
    }
  }

  return result;
}

function addVec3(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function subtractVec3(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function scaleVec3(vector, scale) {
  return [vector[0] * scale, vector[1] * scale, vector[2] * scale];
}

function dotVec3(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function normalizeVec3(vector) {
  const length = Math.hypot(vector[0], vector[1], vector[2]) || 1;
  return [vector[0] / length, vector[1] / length, vector[2] / length];
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function degToRad(value) {
  return value * Math.PI / 180;
}

function lerpAngle(current, target, amount) {
  const wrapped = current + ((((target - current) % (Math.PI * 2)) + Math.PI * 3) % (Math.PI * 2) - Math.PI);
  return current + (wrapped - current) * amount;
}
