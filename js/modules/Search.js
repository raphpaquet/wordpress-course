import $ from "jquery";

class Search {
  constructor() {
    this.resultsDiv = document.querySelector("#search-overlay__results");
    this.openButton = document.querySelectorAll(".js-search-trigger");
    this.closeButton = document.querySelector(".search-overlay__close");
    this.searchOverlay = document.querySelector(".search-overlay");
    this.searchField = document.querySelector("#search-term");
    this.typingTimer;
    this.previousValue;
    this.events();
    this.isOverlayOpen = false;
    this.isSpinnerVisible = false;
  }

  //2. events
  events() {
    this.openButton[0].addEventListener("click", this.openOverlay.bind(this));
    this.openButton[1].addEventListener("click", this.openOverlay.bind(this));
    this.closeButton.addEventListener("click", this.closeOverlay.bind(this));
    document.addEventListener("keydown", this.keyPressDispatcher.bind(this));
    this.searchField.addEventListener("keyup", this.typingLogic.bind(this));
  }

  //3. methods (or functions)
  openOverlay() {
    this.searchOverlay.classList.add("search-overlay--active");
    document.querySelector("body").classList.add("body-no-scroll");
    this.isOverlayOpen = true;
  }

  closeOverlay() {
    this.searchOverlay.classList.remove("search-overlay--active");
    document.querySelector("body").classList.remove("body-no-scroll");
    this.isOverlayOpen = false;
  }

  keyPressDispatcher(e) {
    // S Key to open search bar and esc to close it
    if (
      e.keyCode === 83 &&
      !this.isOverlayOpen &&
      !$("input, textarea").is(":focus")
    ) {
      this.openOverlay();
      this.isOverlayOpen = true;
    }
    // Escape Key
    if (e.keyCode === 27 && this.isOverlayOpen) {
      this.closeOverlay();
      this.isOverlayOpen = false;
    }
  }

  typingLogic() {
    if (this.searchField.value != this.previousValue) {
      // resetting the timer between every typing letter (if it's < than timeout ms)
      clearTimeout(this.typingTimer);
      if (this.searchField.value) {
        if (!this.isSpinnerVisible) {
          this.resultsDiv.innerHTML = '<div class="spinner-loader"></div>';
          this.isSpinnerVisible = true;
        }
        this.typingTimer = setTimeout(this.getResults.bind(this), 2000);
      } else {
        this.resultsDiv.innerHTML = "";
        this.isSpinnerVisible = false;
      }
    }
    this.previousValue = this.searchField.value;
  }

  getResults() {
    $.getJSON(
      universityData.root_url + `/wp-json/wp/v2/posts?search=${this.searchField.value}`,
      (posts) => {
        this.resultsDiv.innerHTML = `
        <h2 class='search-overlay__section-title'>General Information</h2>
        ${
          posts.length > 0
            ? `<ul class="link-list min-list">
              ${posts
                .map(
                  (post) =>
                    `<li><a href='${post.link}'>${post.title.rendered}</a></li>`
                )
                .join("")}
              </ul>`
            : `<p>No general information matches that search</p>`
        }
      `;
      }
    );
    this.isSpinnerVisible = false;
  }
}

export default Search;
