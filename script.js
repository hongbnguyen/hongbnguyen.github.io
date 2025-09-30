// ---------------- Project cards: open/close ----------------
let built = { project1: false, project2: false };

document.addEventListener("DOMContentLoaded", () => {
  // card click opens a panel
  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
      showDescription(card.getAttribute("data-project"));
    });
  });

  // open from ?project=project1|project2
  const q = new URLSearchParams(window.location.search).get("project");
  if (q) showDescription(q);
});

function showDescription(projectId) {
  // hide all, unselect all
  document.querySelectorAll(".project-details").forEach(d => d.classList.add("hidden"));
  document.querySelectorAll(".project-card").forEach(c => c.classList.remove("selected"));

  // show selected
  const panel = document.getElementById(projectId);
  if (panel) panel.classList.remove("hidden");
  const card = document.querySelector(`.project-card[data-project="${projectId}"]`);
  if (card) card.classList.add("selected");

  // lazily build charts once per project
  if (projectId === "project1" && !built.project1) {
    if (window.Highcharts) buildGravityCharts();
    built.project1 = true;
  }
  if (projectId === "project2" && !built.project2) {
    if (window.Highcharts) buildFrictionCharts();
    built.project2 = true;
  }

  // reflow any charts inside the newly shown panel
  if (window.Highcharts && panel) {
    panel.querySelectorAll(".chart").forEach(container => {
      const chart = Highcharts.charts.find(c => c && c.renderTo === container);
      if (chart) chart.reflow();
    });
  }
}

function closeDescription() {
  document.querySelectorAll(".project-details").forEach(d => d.classList.add("hidden"));
  document.querySelectorAll(".project-card").forEach(c => c.classList.remove("selected"));
}

// ---------------- Shared video modal ----------------
let currentVideoIndex = 0;
let currentVideos = [];

function updateVideo() {
  if (!currentVideos.length) return;
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("modalVideo");
  const title = document.getElementById("videoTitle");
  const instr = document.getElementById("videoInstruction");

  video.src = currentVideos[currentVideoIndex].src;
  title.textContent = currentVideos[currentVideoIndex].title || "";
  instr.textContent = "Use ← and → arrow keys to navigate videos.";
  modal.style.display = "block";

  video.play().catch(() => {});
  video.onended = function () {
    this.currentTime = 0;
    this.play().catch(() => {});
  };
}

document.addEventListener("keydown", (e) => {
  const open = document.getElementById("videoModal").style.display === "block";
  if (!open || !currentVideos.length) return;
  if (e.key === "ArrowRight") {
    currentVideoIndex = (currentVideoIndex + 1) % currentVideos.length;
    updateVideo();
  } else if (e.key === "ArrowLeft") {
    currentVideoIndex = (currentVideoIndex - 1 + currentVideos.length) % currentVideos.length;
    updateVideo();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("videoModal");
  if (!modal) return;
  modal.addEventListener("mouseleave", () => {
    modal.style.display = "none";
    const v = document.getElementById("modalVideo");
    if (v) v.pause();
  });
});

// ---------------- Highcharts: Project 1 (Gravity) ----------------
function buildGravityCharts() {
  const vids = {
    chart1a: [
      [{ src: "videos/upward_acc.mp4", title: "Upward — Accelerating" },
       { src: "videos/upward_contsslow.mp4", title: "Upward — Constant (Slow)" },
       { src: "videos/upward_contsfast.mp4", title: "Upward — Constant (Fast)" }],
      [{ src: "videos/downward_acc.mp4", title: "Downward — Accelerating" },
       { src: "videos/downward_contsslow.mp4", title: "Downward — Constant (Slow)" },
       { src: "videos/downward_contsfast.mp4", title: "Downward — Constant (Fast)" }]
    ],
    chart2a: [
      [{ src: "videos/upward_acc.mp4", title: "Upward — Accelerating" },
       { src: "videos/upward_contsslow.mp4", title: "Upward — Constant (Slow)" },
       { src: "videos/upward_contsfast.mp4", title: "Upward — Constant (Fast)" }],
      [{ src: "videos/hori_acc.mp4", title: "Horizontal — Accelerating" },
       { src: "videos/hori_contsslow.mp4", title: "Horizontal — Constant (Slow)" },
       { src: "videos/hori_contsfast.mp4", title: "Horizontal — Constant (Fast)" }]
    ],
    chart3a: [
      [{ src: "videos/downward_acc.mp4", title: "Downward — Accelerating" },
       { src: "videos/downward_contsslow.mp4", title: "Downward — Constant (Slow)" },
       { src: "videos/downward_contsfast.mp4", title: "Downward — Constant (Fast)" }],
      [{ src: "videos/hori_acc.mp4", title: "Horizontal — Accelerating" },
       { src: "videos/hori_contsslow.mp4", title: "Horizontal — Constant (Slow)" },
       { src: "videos/hori_contsfast.mp4", title: "Horizontal — Constant (Fast)" }]
    ],
    chart4a: [
      [{ src: "videos/upward_dec.mp4", title: "Upward — Decelerating" },
       { src: "videos/upward_contsslow.mp4", title: "Upward — Constant (Slow)" },
       { src: "videos/upward_contsfast.mp4", title: "Upward — Constant (Fast)" }],
      [{ src: "videos/downward_dec.mp4", title: "Downward — Decelerating" },
       { src: "videos/downward_contsslow.mp4", title: "Downward — Constant (Slow)" },
       { src: "videos/downward_contsfast.mp4", title: "Downward — Constant (Fast)" }]
    ],
    chart5a: [
      [{ src: "videos/downward_dec.mp4", title: "Downward — Decelerating" },
       { src: "videos/downward_contsslow.mp4", title: "Downward — Constant (Slow)" },
       { src: "videos/downward_contsfast.mp4", title: "Downward — Constant (Fast)" }],
      [{ src: "videos/hori_dec.mp4", title: "Horizontal — Decelerating" },
       { src: "videos/hori_contsslow.mp4", title: "Horizontal — Constant (Slow)" },
       { src: "videos/hori_contsfast.mp4", title: "Horizontal — Constant (Fast)" }]
    ],
    chart6a: [
      [{ src: "videos/upward_dec.mp4", title: "Upward — Decelerating" },
       { src: "videos/upward_contsslow.mp4", title: "Upward — Constant (Slow)" },
       { src: "videos/upward_contsfast.mp4", title: "Upward — Constant (Fast)" }],
      [{ src: "videos/hori_dec.mp4", title: "Horizontal — Decelerating" },
       { src: "videos/hori_contsslow.mp4", title: "Horizontal — Constant (Slow)" },
       { src: "videos/hori_contsfast.mp4", title: "Horizontal — Constant (Fast)" }]
    ]
  };

  const charts = [
    { id: "chart1a", title: "Experiment 1: Upward vs. Downward Acceleration", categories: ["Upward", "Downward"], data: [2.27, 1.95], colors: ["#f89421", "#692d8a"] },
    { id: "chart2a", title: "Experiment 2: Upward vs. Horizontal Acceleration", categories: ["Upward", "Horizontal"], data: [2.93, 2.44], colors: ["#f7941d", "#006738"] },
    { id: "chart3a", title: "Experiment 3: Downward vs. Horizontal Acceleration", categories: ["Downward", "Horizontal"], data: [2.57, 2.37], colors: ["#692d8a", "#006738"] },
    { id: "chart4a", title: "Experiment 4: Deceleration Detection (Upward vs. Downward)", categories: ["Upward", "Downward"], data: [2.30, 2.55], colors: ["#f89421", "#692d8a"] },
    { id: "chart5a", title: "Experiment 5: Deceleration Detection (Downward vs. Horizontal)", categories: ["Downward", "Horizontal"], data: [2.96, 2.78], colors: ["#692d8a", "#006738"] },
    { id: "chart6a", title: "Experiment 6: Deceleration Detection (Upward vs. Horizontal)", categories: ["Upward", "Horizontal"], data: [2.25, 2.95], colors: ["#f89421", "#006738"] }
  ];

  charts.forEach(cfg => {
    Highcharts.chart(cfg.id, {
      chart: { type: "column" },
      title: { text: cfg.title },
      xAxis: { categories: cfg.categories, labels: { style: { fontSize: "12px" }, y: 18 } },
      yAxis: { title: { text: "d'" }, min: 0, max: 4 },
      tooltip: { formatter() { return `d': ${this.y.toFixed(2)}`; } },
      series: [{ data: cfg.data, colorByPoint: true, colors: cfg.colors, showInLegend: false }],
      plotOptions: {
        column: {
          pointPadding: 0.2, borderWidth: 0, groupPadding: 0.1,
          point: {
            events: {
              mouseOver: function () {
                const chartId = this.series.chart.renderTo.id;
                const idx = this.index;
                const sets = vids[chartId] && vids[chartId][idx];
                if (sets?.length) { currentVideos = sets; currentVideoIndex = 0; updateVideo(); }
              }
            }
          }
        }
      }
    });
  });
}

// ---------------- Highcharts: Project 2 (Friction & Attention) ----------------
function buildFrictionCharts() {
  // Exp 1: RT with icon labels + error bars
  (function () {
    const cats = ["clockwise_left","clockwise_right","counterclockwise_left","counterclockwise_right"];
    const rt   = [{ y:553, className:"highcharts-color-7" }, { y:509, className:"highcharts-color-1" },
                  { y:535, className:"highcharts-color-1" }, { y:561, className:"highcharts-color-7" }];
    const se   = [[543,560],[499,516],[525,542],[551,568]];

    Highcharts.chart("fchart1a", {
      chart: { type: "column", spacingBottom: 70 },
      title: { text: "Spatial Cueing by a Rotating Object" },
      xAxis: {
        categories: cats,
        labels: {
        useHTML: true,
        y: 40,                                      // a bit lower
        formatter: function () {
            const r = "img/projects/";                // make sure files exist here
            const v = this.value;
            if (v==="clockwise_left")        return `<img src="${r}clockwise_letterleft.svg" style="width:54px;display:block;margin-top:8px" />`;
            if (v==="clockwise_right")       return `<img src="${r}clockwise_letterright.svg" style="width:54px;display:block;margin-top:8px" />`;
            if (v==="counterclockwise_left") return `<img src="${r}counterclockwise_letterleft.svg" style="width:54px;display:block;margin-top:8px" />`;
            if (v==="counterclockwise_right")return `<img src="${r}counterclockwise_letterright.svg" style="width:54px;display:block;margin-top:8px" />`;
            return "";
        }
        }
    },
      yAxis: { title: { text: "Response Time (ms)" }, min: 400, max: 700, tickAmount: 4 },
      tooltip: { enabled: false },
      series: [
        { type: "column", data: rt, colorByPoint: true, showInLegend: false },
        { type: "errorbar", data: se, whiskerLength: "10%", whiskerWidth: 2, stemWidth: 2 }
      ],
      plotOptions: {
        column: {
          pointPadding: 0.2, borderWidth: 0, groupPadding: 0.1,
          point: { events: {
            mouseOver: function () {
              const i = this.index;
              const sets = [
                [{ src:"videos/clockwise_letterleft.mp4",        title:"Clockwise — Letter Left" }],
                [{ src:"videos/clockwise_letterright.mp4",       title:"Clockwise — Letter Right" }],
                [{ src:"videos/counterclockwise_letterleft.mp4", title:"Counterclockwise — Letter Left" }],
                [{ src:"videos/counterclockwise_letterright.mp4",title:"Counterclockwise — Letter Right" }]
              ];
              currentVideos = sets[i] || []; currentVideoIndex = 0; updateVideo();
            } } }
        },
        errorbar: { tooltip: { enabled: false } }
      }
    });
  })();

  // Exp 2: Effect with icon labels + error bars
  (function () {
    const cats = ["floor_touching","floor_nottouching","ceiling_touching","ceiling_nottouching"];
    const eff = [
        { y: 48,  color: "#006738" },  // Floor-congruent (green)
        { y: 7,   color: "#999999" },  // Floor-not touching (gray)
        { y: -27, color: "#c0392b" },  // Ceiling-congruent (red)
        { y: -10, color: "#999999" }   // Ceiling-not touching (gray)
        ];
    const se   = [[45,49],[4,9],[-30,-25],[-13,-8]];

    Highcharts.chart("fchart2a", {
      chart: { type: "column", spacingBottom: 70 },
      title: { text: "Effect of Visible Surface Contact on Rotation Cueing" },
      xAxis: {
        categories: cats,
        labels: {
        useHTML: true,
        y: 40,
        formatter: function () {
            const r = "img/projects/";
            const v = this.value;
            if (v==="floor_touching")      return `<img src="${r}floor_touching.svg" style="width:54px;display:block;margin-top:8px" />`;
            if (v==="floor_nottouching")   return `<img src="${r}floor_nottouching.svg" style="width:54px;display:block;margin-top:8px" />`;
            if (v==="ceiling_touching")    return `<img src="${r}ceiling_touching.svg" style="width:54px;display:block;margin-top:8px" />`;
            if (v==="ceiling_nottouching") return `<img src="${r}ceiling_nottouching.svg" style="width:54px;display:block;margin-top:8px" />`;
            return "";
        }
        }
    },
      yAxis: { title: { text: "Incong − Cong RT (ms)" }, min: -60, max: 60, tickAmount: 7 },
      tooltip: { enabled: false },
      series: [
        { type: "column", data: eff, colorByPoint: true, showInLegend: false },
        { type: "errorbar", data: se, whiskerLength: "10%", whiskerWidth: 2, stemWidth: 2 }
      ],
      plotOptions: {
        column: {
          pointPadding: 0.2, borderWidth: 0, groupPadding: 0.1,
          point: { events: {
            mouseOver: function () {
              const i = this.index;
              const sets = [
                [{ src:"videos/clockwise_letterright_floor.mp4",       title:"Floor Touching — CW Right" },
                 { src:"videos/counterclockwise_letterleft_floor.mp4", title:"Floor Touching — CCW Left" }],
                [{ src:"videos/clockwise_letterright_floor_nottouching.mp4",       title:"Floor Not Touching — CW Right" },
                 { src:"videos/counterclockwise_letterleft_floor_nottouching.mp4", title:"Floor Not Touching — CCW Left" }],
                [{ src:"videos/clockwise_letterleft_ceiling.mp4",       title:"Ceiling Touching — CW Left" },
                 { src:"videos/counterclockwise_letterright_ceiling.mp4",title:"Ceiling Touching — CCW Right" }],
                [{ src:"videos/clockwise_letterleft_ceiling_nottouching.mp4",       title:"Ceiling Not Touching — CW Left" },
                 { src:"videos/counterclockwise_letterright_ceiling_nottouching.mp4",title:"Ceiling Not Touching — CCW Right" }]
              ];
              currentVideos = sets[i] || []; currentVideoIndex = 0; updateVideo();
            } } }
        },
        errorbar: { tooltip: { enabled: false } }
      }
    });
  })();
}
