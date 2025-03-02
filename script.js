document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card");

  // Attach click handlers to project cards
  projectCards.forEach((card) => {
      card.addEventListener("click", () => {
          const projectId = card.getAttribute("data-project");
          showDescription(projectId);
      });
  });

  // Function to get URL parameter
  function getQueryParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
  }

  // Check if a project was passed in the URL and open it
  const projectId = getQueryParam("project");
  if (projectId) {
      showDescription(projectId);
  }
});

// Function to show project description
function showDescription(projectId) {
  const allDescriptions = document.querySelectorAll(".project-details");
  const allCards = document.querySelectorAll(".project-card");

  // Hide all descriptions and remove 'selected' class
  allDescriptions.forEach((desc) => desc.classList.add("hidden"));
  allCards.forEach((card) => card.classList.remove("selected"));

  // Show the relevant description
  const projectElement = document.getElementById(projectId);
  if (projectElement) {
      projectElement.classList.remove("hidden");

      // Highlight the corresponding project card
      const selectedCard = document.querySelector(`.project-card[data-project="${projectId}"]`);
      if (selectedCard) {
          selectedCard.classList.add("selected");
      }
  }
}

// Function to close project descriptions
function closeDescription() {
  const allDescriptions = document.querySelectorAll(".project-details");
  const allCards = document.querySelectorAll(".project-card");

  // Hide all descriptions and remove 'selected' class
  allDescriptions.forEach((desc) => desc.classList.add("hidden"));
  allCards.forEach((card) => card.classList.remove("selected"));
}

// --------------------------- Highcharts & Video Logic --------------------------- //

let currentVideoIndex = 0;
let currentVideos = [];
let videoTimeout;

function updateVideo() {
  if (currentVideos.length === 0) return;

  let videoElement = document.getElementById("modalVideo");
  let titleElement = document.getElementById("videoTitle");
  let instructionElement = document.getElementById("videoInstruction");
  let videoModal = document.getElementById("videoModal");

  // Update video source, title, and instruction
  videoElement.src = currentVideos[currentVideoIndex].src;
  titleElement.innerText = currentVideos[currentVideoIndex].title;
  instructionElement.innerText = "Use ← and → arrow keys to navigate videos.";

  // Just display it, CSS handles position
  videoModal.style.display = "block";

  // Play video
  videoElement.play();

  // **Ensure video loops continuously**
  videoElement.onended = function () {
    this.currentTime = 0; // Restart from beginning
    this.play(); // Play again
  };
}


// Handle keyboard navigation
document.addEventListener("keydown", function (event) {
  if (document.getElementById("videoModal").style.display === "block") {
      if (event.key === "ArrowRight") {
          // Right arrow → Go to the next video
          currentVideoIndex = (currentVideoIndex + 1) % currentVideos.length;
          updateVideo();
      } else if (event.key === "ArrowLeft") {
          // Left arrow → Go to the previous video
          currentVideoIndex = (currentVideoIndex - 1 + currentVideos.length) % currentVideos.length;
          updateVideo();
      }
  }
});



document.addEventListener("DOMContentLoaded", function () {
  // Chart Data (Ensure all experiments show)
  const chartData = [
    { 
        id: "chart1a", 
        title: "Experiment 1: Upward vs. Downward Acceleration", 
        categories: ["Upward", "Downward"], 
        videos: [
            [
                { src: "videos/upward_acc.mp4", title: "Upward Accelerating Object (1 of 3)" },
                { src: "videos/upward_contsslow.mp4", title: "Upward Constant Moving Object (Slow) (2 of 3)" },
                { src: "videos/upward_contsfast.mp4", title: "Upward Constant Moving Object (Fast) (3 of 3)" }
            ],
            [
                { src: "videos/downward_acc.mp4", title: "Downward Accelerating Object (1 of 3)" },
                { src: "videos/downward_contsslow.mp4", title: "Downward Constant Moving Object (Slow) (2 of 3)" },
                { src: "videos/downward_contsfast.mp4", title: "Downward Constant Moving Object (Fast) (3 of 3)" }
            ]
        ]
    },
    { 
        id: "chart2a", 
        title: "Experiment 2: Upward vs. Horizontal Acceleration", 
        categories: ["Upward", "Horizontal"], 
        videos: [
            [
                { src: "videos/upward_acc.mp4", title: "Upward Accelerating Object (1 of 3)" },
                { src: "videos/upward_contsslow.mp4", title: "Upward Constant Moving Object (Slow) (2 of 3)" },
                { src: "videos/upward_contsfast.mp4", title: "Upward Constant Moving Object (Fast) (3 of 3)" }
            ],
            [
                { src: "videos/hori_acc.mp4", title: "Horizontal Accelerating Object (1 of 3)" },
                { src: "videos/hori_contsslow.mp4", title: "Horizontal Constant Moving Object (Slow) (2 of 3)" },
                { src: "videos/hori_contsfast.mp4", title: "Horizontal Constant Moving Object (Fast) (3 of 3)" }
            ]
        ]
    },
    { 
        id: "chart3a", 
        title: "Experiment 3: Downward vs. Horizontal Acceleration", 
        categories: ["Downward", "Horizontal"], 
        videos: [
            [
                { src: "videos/downward_acc.mp4", title: "Downward Accelerating Object (1 of 3)" },
                { src: "videos/downward_contsslow.mp4", title: "Downward Constant Moving Object (Slow) (2 of 3)" },
                { src: "videos/downward_contsfast.mp4", title: "Downward Constant Moving Object (Fast) (3 of 3)" }
            ],
            [
                { src: "videos/hori_acc.mp4", title: "Horizontal Accelerating Object (1 of 3)" },
                { src: "videos/hori_contsslow.mp4", title: "Horizontal Constant Moving Object (Slow) (2 of 3)" },
                { src: "videos/hori_contsfast.mp4", title: "Horizontal Constant Moving Object (Fast) (3 of 3)" }
            ]
        ]
    },
    { 
        id: "chart4a", 
        title: "Experiment 4: Deceleration Detection (Upward vs. Downward)", 
        categories: ["Upward", "Downward"], 
        videos: [
            [
                { src: "videos/upward_dec.mp4", title: "Upward Decelerating Object (1 of 3)" },
                { src: "videos/upward_contsslow.mp4", title: "Upward Constant Moving Object (Slow) (2 of 3)" },
                { src: "videos/upward_contsfast.mp4", title: "Upward Constant Moving Object (Fast) (3 of 3)" }
            ],
            [
                { src: "videos/downward_dec.mp4", title: "Downward Decelerating Object (1 of 3)" },
                { src: "videos/downward_contsslow.mp4", title: "Downward Constant Moving Object (Slow) (2 of 3)" },
                { src: "videos/downward_contsfast.mp4", title: "Downward Constant Moving Object (Fast) (3 of 3)" }
            ]
        ]
    },
    { 
        id: "chart5a", 
        title: "Experiment 5: Deceleration Detection (Downward vs. Horizontal)", 
        categories: ["Downward", "Horizontal"], 
        videos: [
            [
                { src: "videos/downward_dec.mp4", title: "Downward Decelerating Object (1 of 3)" },
                { src: "videos/downward_contsslow.mp4", title: "Downward Constant Moving Object (Slow) (2 of 3)" },
                { src: "videos/downward_contsfast.mp4", title: "Downward Constant Moving Object (Fast) (3 of 3)" }
            ],
            [
                { src: "videos/hori_dec.mp4", title: "Horizontal Decelerating Object (1 of 3)" },
                { src: "videos/hori_contsslow.mp4", title: "Horizontal Constant Moving Object (Slow) (2 of 3)" },
                { src: "videos/hori_contsfast.mp4", title: "Horizontal Constant Moving Object (Fast) (3 of 3)" }
            ]
        ]
    },
    { 
        id: "chart6a", 
        title: "Experiment 6: Deceleration Detection (Upward vs. Horizontal)", 
        categories: ["Upward", "Horizontal"], 
        videos: [
            [
                { src: "videos/upward_dec.mp4", title: "Upward Decelerating Object (1 of 3)" },
                { src: "videos/upward_contsslow.mp4", title: "Upward Constant Moving Object (Slow) (2 of 3)" },
                { src: "videos/upward_contsfast.mp4", title: "Upward Constant Moving Object (Fast) (3 of 3)" }
            ],
            [
                { src: "videos/hori_dec.mp4", title: "Horizontal Decelerating Object (1 of 3)" },
                { src: "videos/hori_contsslow.mp4", title: "Horizontal Constant Moving Object (Slow) (2 of 3)" },
                { src: "videos/hori_contsfast.mp4", title: "Horizontal Constant Moving Object (Fast) (3 of 3)" }
            ]
        ]
    }

  ];


// Generate all charts
chartData.forEach(chart => {
  let seriesData = [];

  if (chart.id === "chart1a") {
      seriesData = [
          {
              data: [2.28, 1.96],  
              colorByPoint: true, 
              colors: ["#f89421", "#692d8a"], 
              showInLegend: false 
          }
      ];
  } 
  else if (chart.id === "chart2a") {
      seriesData = [
          {
              data: [2.93, 2.44],  
              colorByPoint: true,
              colors: ["#f7941d", "#006738"], 
              showInLegend: false 
          }
      ];
  } 
  else if (chart.id === "chart3a") {
      seriesData = [
          {
              data: [2.57, 2.37],  
              colorByPoint: true,
              colors: ["#692d8a", "#006738"], 
              showInLegend: false 
          }
      ];
  } 
  else if (chart.id === "chart4a") {
      seriesData = [
          {
              data: [2.3, 2.55],  
              colorByPoint: true,
              colors: ["#f89421", "#692d8a"], 
              showInLegend: false 
          }
      ];
  } 
  else if (chart.id === "chart5a") {
      seriesData = [
          {
              data: [2.96, 2.78],  
              colorByPoint: true,
              colors: ["#692d8a", "#006738"], 
              showInLegend: false 
          }
      ];
  } 
  else if (chart.id === "chart6a") {
      seriesData = [
          {
              data: [2.53, 3.05],  
              colorByPoint: true,
              colors: ["#f89421", "#006738"], 
              showInLegend: false 
          }
      ];
  }

  Highcharts.chart(chart.id, {
      chart: { type: "column" },
      title: { text: chart.title },
      xAxis: { 
          categories: chart.categories, 
          labels: {
              style: { fontSize: "12px" }
          }
      },
      yAxis: { 
          title: { text: "d'" }, 
          min: 0, 
          max: 4 
      },
      tooltip: {
          formatter: function() {
              return `d': ${this.y.toFixed(2)}`; 
          }
      },
      series: seriesData,
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0,
              point: {
                  events: {
                      mouseOver: function () {
                          let categoryIndex = this.index; 
                          
                          if (chart.videos && chart.videos[categoryIndex]) {
                              currentVideos = chart.videos[categoryIndex];
                              currentVideoIndex = 0; 
                          
                              let videoModal = document.getElementById("videoModal");
                              videoModal.style.display = "block";
                          
                              videoModal.style.left = document.querySelector(".sidebar").offsetLeft + "px";
                          
                              updateVideo(); 
                          }
                      }
                  }
              }
          }
      }
  });
});


  // Ensure video stays visible when hovered over
  document.getElementById("videoModal").addEventListener("mouseenter", function () {
      clearTimeout(videoTimeout);
  });

  // Close modal when user moves away from video
  document.getElementById("videoModal").addEventListener("mouseleave", function () {
      document.getElementById("videoModal").style.display = "none";
      document.getElementById("modalVideo").pause();
  });
});
