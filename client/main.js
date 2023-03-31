class Poll {
    constructor(root, title) {
        this.root = root;
        this.selected = sessionStorage.getItem("poll-selected");
        this.endpoint = "http://localhost:8000/poll";

        this.root.insertAdjacentHTML("afterbegin", `<div class="poll_title">${ title }</div>` );

        this._refresh();
    }

    async _refresh() {
        const response = await fetch(this.endpoint);
        const data = await response.json();

        this.root.querySelectorAll(".poll_option").forEach(option => {
            option.remove();
        });

        let i = 1;
        let image = document.createElement("img");

        for (const option of data) {
            const template = document.createElement("template");
            const fragment = template.content;
            
            image = `<img src="images/Gen${i}.jpg" alt="Gen1" width="70%" height="150px">`;
            i++;

            template.innerHTML = `
                <div class="poll_option ${ this.selected == option.label ? "poll_option-selected": "" }">
                    <div class="poll_option-fill"></div>
                    <div class="poll_option-info">
                        <span class="poll_label"> ${image}${ option.label }</span>
                        <span class="poll_percentage">${ option.percentage }%</span>
                    </div>
                </div> `;

            if (!this.selected) {
                fragment.querySelector(".poll_option").addEventListener("click", () => {
                    fetch(this.endpoint, {
                        method: "post",
                        body: `add=${ option.label }`,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }).then(() => {
                        this.selected = option.label;

                        sessionStorage.setItem("poll-selected", option.label);

                        this._refresh();
                    })
                });
            }

            fragment.querySelector(".poll_option-fill").style.width = `${ option.percentage }%`;

            this.root.appendChild(fragment);
        }
    }
}

const p = new Poll(
    document.querySelector(".poll"),
    "Which Pokémon GEN has the best starters?"
);
