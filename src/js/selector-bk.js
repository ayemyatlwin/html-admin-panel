document.addEventListener("click", function (event) {
  const dropdowns = document.querySelectorAll(".tags-dropdown");
  const inputs = document.querySelectorAll(".tags-input");

  dropdowns.forEach((dropdown, index) => {
    console.log("index", index);
    const input = inputs[index];
    console.log("input", input);
    if (
      dropdown &&
      event.target !== input &&
      !dropdown.contains(event.target)
    ) {
      dropdown.style.display = "none";
    }
  });
});

window.tagComponent = (
  container,
  title,
  tagsArray,
  addNewTag,
  checkAddButton = true
) => {
  const tag_name_eng = crypto.randomUUID();
  const tag_name_mm = crypto.randomUUID();

  let selectedTags = []; // Maintain independent state for each component
  let initialTags = [];

  function render() {
    //clearn container
    container.innerHTML = "";
    const tagsContainer = document.createElement("div");
    tagsContainer.classList.add("tags");

    tagsDropdown = document.createElement("ul");
    tagsDropdown.classList.add("tags-dropdown", "flex-col", "absolute");
    tagsDropdown.style.display = "none";
    tagsDropdown.id = "tags-dropdown";

    const hiddenInput = createhiddenInput(container);
    const input = createInput(
      selectedTags,
      tagsContainer,
      tagsDropdown,
      hiddenInput
    );

    const dataValue = container.getAttribute("data-value");
    if (dataValue && selectedTags.length === 0) {
      const selectedIds = dataValue.split(",");
      initialTags = tagsArray.filter((tag) =>
        selectedIds.includes(tag.id.toString())
      );
      selectedTags = [...initialTags];
      updateHiddenInput(selectedTags, initialTags, hiddenInput);
    }

    const label = document.createElement("h1");
    label.innerText = title;

    const inputWrapper = document.createElement("div");
    inputWrapper.classList.add("flex", "items-center", "gap-4", "py-1");

    if (checkAddButton) {
      const addButton = createAddButton();
      const model_wrapper = createModelBox(
        container,
        selectedTags,
        tagsContainer,
        tagsDropdown,
        addNewTag,
        tagsArray,
        tag_name_eng,
        tag_name_mm,
        hiddenInput,
        initialTags
      );

      addButton.addEventListener("click", () => {
        tagsDropdown.style.display = "none";
        model_wrapper.style.display = "flex";
      });
      container.appendChild(label);
      container.appendChild(inputWrapper);
      inputWrapper.appendChild(input);
      inputWrapper.appendChild(addButton);
      container.appendChild(model_wrapper);
    } else {
      container.appendChild(label);
      container.appendChild(inputWrapper);
      inputWrapper.appendChild(input);
    }

    tagsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-btn")) {
        const tagId = e.target.dataset.id;
        selectedTags = selectedTags.filter((tag) => tag.id !== parseInt(tagId));
        initialTags = initialTags.filter((tag) => tag.id !== parseInt(tagId));
        updateHiddenInput(selectedTags, initialTags, hiddenInput);
        renderTags(tagsContainer, selectedTags, initialTags);
      }
      tagsDropdown.style.display = "none";
    });

    inputWrapper.appendChild(hiddenInput);
    container.appendChild(tagsDropdown);
    container.appendChild(tagsContainer);

    // Render initial tags
    renderTags(tagsContainer, selectedTags, initialTags);
    updateHiddenInput(selectedTags, initialTags, hiddenInput);
  }

  function createInput(selectedTags, tagsContainer, tagsDropdown, hiddenInput) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Type to search...";
    input.classList.add("tags-input", "py-4");
    input.addEventListener("focus", (event) => {
      event.stopPropagation();
      renderDropdown(
        tagsArray,
        tagsDropdown,
        tagsContainer,
        selectedTags,
        hiddenInput,
        initialTags
      );
      tagsDropdown.style.display = "flex";
    });

    return input;
  }

  function createhiddenInput(container) {
    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    const dataName = container.getAttribute("data-name");
    console.log("dataName", dataName);
    if (dataName) {
      hiddenInput.name = dataName;
    }
    hiddenInput.value = "";

    return hiddenInput;
  }
  render();
};
function updateHiddenInput(selectedTags, initialTags, hiddenInput) {
  const selectedId = selectedTags.map((selectedTag) => selectedTag.id);
  const initialId = initialTags.map((initialTag) => initialTag.id);
  const allId = [...new Set([...initialId, ...selectedId])];
  console.log("allId", allId);
  hiddenInput.value = allId.join(",");
}

function renderDropdown(
  filteredTags,
  tagsDropdown,
  tagsContainer,
  selectedTags,
  hiddenInput,
  initialTags = []
) {
  tagsDropdown.innerHTML = "";
  filteredTags.forEach((tag) => {
    const item = document.createElement("li");
    item.textContent = tag.name;
    item.setAttribute("data-id", tag.id);

    const isSelected = selectedTags.some(
      (selectedTag) => selectedTag.id === tag.id
    );
    const isInitiallySelected = initialTags.some(
      (initialTag) => initialTag.id === tag.id
    );

    if (isSelected || isInitiallySelected) {
      item.classList.add("disabled");
      item.style.color = "gray";
      item.style.pointerEvents = "none";
    } else {
      item.addEventListener("click", () => {
        if (!isSelected) {
          selectedTags.push(tag);
          updateHiddenInput(selectedTags, initialTags, hiddenInput);
          renderTags(tagsContainer, selectedTags, initialTags);
        }

        // hiddenInput.value = item.dataset.id;
        console.log("hiddenInput.value", hiddenInput.value);
        console.log("hiddenInput.name", hiddenInput.name);
        tagsDropdown.style.display = "none";
      });
    }
    tagsDropdown.appendChild(item);
  });
}

// function addTag(tag, tagsContainer, selectedTags, tag_name_eng, tag_name_mm) {
//   if (!selectedTags.includes(tag)) {
//     selectedTags.push(tag);
//     renderTags(tagsContainer, selectedTags, []);
//     document.getElementById(tag_name_eng).value = "";
//     document.getElementById(tag_name_mm).value = "";
//   }
//   tagsDropdown.style.display = "none";
// }

function renderTags(tagsContainer, selectedTags, initialTags = []) {
  console.log("initialTags", initialTags);
  tagsContainer.innerHTML = "";
  const uniqueTags = [
    ...initialTags,
    ...selectedTags.filter(
      (tag) => !initialTags.some((initialTag) => initialTag.id === tag.id)
    ),
  ];

  uniqueTags.forEach((tag, index) => {
    const tagElement = document.createElement("div");
    tagElement.classList.add("tag");
    tagElement.innerHTML = `
      ${tag.name}
      <button class="remove-btn" data-id="${tag.id}">&times;</button>
    `;
    tagsContainer.appendChild(tagElement);
  });
}
function createAddButton() {
  //create button
  const button = document.createElement("button");
  button.classList.add(
    "flex",
    "justify-center",
    "w-30",
    "px-4",
    "py-4",
    "rounded",
    "bg-primary",
    "font-medium",
    "text-gray",
    "hover:bg-opacity-90"
  );
  button.style.backgroundColor = "#032A5F";
  button.style.color = "white";
  button.innerText = "Add";
  button.type = "button";

  return button;
}

function createModelBox(
  container,
  selectedTags,
  tagsContainer,
  tagsDropdown,
  addNewTag,
  tagsArray,
  tag_name_eng,
  tag_name_mm,
  hiddenInput,
  initialTags
) {
  console.log("tag_name", tag_name_eng, tag_name_mm);
  const model_container = document.createElement("div");
  const model_wrapper = document.createElement("div");
  const wrapper = document.createElement("div");
  const models = document.createElement("div");
  const models_box = document.createElement("div");
  const model = document.createElement("div");
  const model2 = document.createElement("div");
  const modelbutton = document.createElement("div");
  modelbutton.classList.add("flex", "space-x-2");

  model_container.appendChild(model_wrapper);

  models_box.classList.add("flex", "gap-3");

  //model is hidden initially
  model_container.style.display = "none";
  model_container.classList.add("modal");
  model_wrapper.classList.add("modal");
  wrapper.classList.add("wrapper");
  models.classList.add("models");
  modelbutton.classList.add("flex", "space-x-2", "gap-2");

  //add close button
  const close = document.createElement("button");
  close.innerText = "X";
  close.type = "button";
  close.classList.add("custom-close-button");
  close.addEventListener("click", () => {
    model_wrapper.style.display = "none";
  });

  //add title
  const label1 = document.createElement("label");
  label1.setAttribute("for", "tags");
  label1.classList.add("mb-1", "font-medium", "text-primary");
  label1.innerText = "Tag Name (en)";

  const label2 = document.createElement("label");
  label2.setAttribute("for", "tags");
  label2.classList.add("mb-1", "font-medium", "text-primary");
  label2.innerText = "Tag Name (mm)";

  // model box
  const title = document.createElement("h2");
  title.innerText = "Create Tag";
  title.classList.add("title_label");
  wrapper.appendChild(title);
  model.appendChild(label1);
  models_box.appendChild(model);
  models_box.appendChild(model2);
  models.appendChild(models_box);
  wrapper.appendChild(models);
  model_wrapper.appendChild(wrapper);

  // create tag name
  const tagsname1 = document.createElement("div");
  tagsname1.classList.add("flex", "items-center", "space-x-2");
  const tagnameInput1 = document.createElement("input");
  tagnameInput1.classList.add(
    "w-full",
    "rounded-lg",
    "border",
    "border-stroke",
    "bg-transparent",
    "py-2",
    "px-4",
    "mt-2",
    "outline-none",
    "focus:border-primary",
    "focus-visible:shadow-none"
  );
  tagnameInput1.id = tag_name_eng;
  tagnameInput1.type = "text";
  tagnameInput1.placeholder = "Enter tag Name";
  tagsname1.appendChild(tagnameInput1);
  model.appendChild(tagsname1);

  model2.appendChild(label2);
  const tagsname2 = document.createElement("div");
  tagsname2.classList.add("flex", "items-center", "space-x-2");
  const tagnameInput2 = document.createElement("input");
  tagnameInput2.classList.add(
    "w-full",
    "rounded-lg",
    "border",
    "border-stroke",
    "bg-transparent",
    "py-2",
    "px-4",
    "mt-2",
    "outline-none",
    "focus:border-primary",
    "focus-visible:shadow-none"
  );
  tagnameInput2.id = tag_name_mm;
  tagnameInput2.type = "text";
  tagnameInput2.placeholder = "Enter Tag Name";
  tagsname2.appendChild(tagnameInput2);
  model2.appendChild(tagsname2);

  // save button
  const savebutton = document.createElement("button");
  savebutton.innerText = "Save";
  savebutton.type = "button";
  savebutton.classList.add("px-6", "py-2", "rounded-lg");
  savebutton.style.backgroundColor = "#032A5F";
  savebutton.style.color = "white";
  savebutton.style.width = "200px";
  savebutton.addEventListener("click", () => {
    const newTag = document.getElementById(tag_name_eng).value.trim();
    const newTagMM = document.getElementById(tag_name_mm).value.trim();
    if (!newTag || !newTagMM) return;
    const addedTag = addNewTag(newTag, newTagMM);
    console.log(addedTag);
    tagsArray.push(addedTag);
    selectedTags.push(addedTag);
    updateHiddenInput(selectedTags, initialTags, hiddenInput);
    renderTags(tagsContainer, selectedTags, initialTags);

    const dataName = container.getAttribute("data-name");
    // hiddenInput.value = addedTag.id;
    hiddenInput.name = dataName;

    console.log("hiddenInput.value", hiddenInput.value);
    console.log("hiddenInput.name", hiddenInput.name);

    model_wrapper.style.display = "none";
    tagsDropdown.style.display = "none";

    document.getElementById(tag_name_eng).value = "";
    document.getElementById(tag_name_mm).value = "";
  });

  modelbutton.appendChild(savebutton);
  wrapper.appendChild(modelbutton);

  // cancel button
  const cancelButton = document.createElement("button");
  cancelButton.innerText = "Cancel";
  cancelButton.type = "button";
  cancelButton.classList.add("px-6", "py-2", "rounded-lg");
  cancelButton.style.outlineColor = "#032A5F";
  cancelButton.style.outlineWidth = "1px";
  cancelButton.style.outlineStyle = "solid";
  cancelButton.style.color = "black";
  model_wrapper.style.display = "none";

  cancelButton.style.width = "200px";
  cancelButton.addEventListener("click", () => {
    model_wrapper.style.display = "none";
  });
  modelbutton.appendChild(cancelButton);
  models.appendChild(modelbutton);

  return model_wrapper;
}

const style = document.createElement("style");
style.innerHTML = `
  .tags {
    display: flex;
    position: absolute;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 3px;
  }

  .tags .tag {
    display: flex;
    align-items: center;
    background-color: #007bff;
    color: #fff;
    padding: 4px 8px;
    border-radius: 16px;
    font-size: 14px;
  }

  .tags .tag .remove-btn {
    margin-left: 8px;
    background: none;
    border: none;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
  }

      .tags-input {
    flex-grow: 1;
    outline: 2px solid transparent;
    outline-offset: 2px;
    font-size: 14px;
    width: 100%;
    border: 1px solid rgb(226, 232, 240);
    border-radius: 0.5rem;
  }
      .tags-dropdown {
    // position:absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-width:970px;
    max-height: 150px;
    overflow-y: auto;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 4px;
    z-index: 1 !important;
  }

  .tags-dropdown li {
    padding: 8px;
    cursor: pointer;
  }

  .tags-dropdown li:hover {
    background: #007bff;
    color: #fff;
  }
    .tags-dropdown .disabled {
  color: #dddddd !important;
  pointer-events: none;
}

  .title_label{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #032A5F;
    font-size: 20px;
    font-weight: bolder;
    margin-bottom: 8px;
  }

.models{
 display: flex;
 justify-content: center;
 flex-direction: column;
 align-items: center;
 padding-top: 16px;
 gap: 16px;
}    
 "w-full",
    "rounded-lg",
    "border",
    "border-stroke",
    "bg-transparent",
    "py-2",
    "px-4",
    "mt-2",
    "outline-none",
    "focus:border-primary",
    "focus-visible:shadow-none"

.btn{
 width: full;
 
}
.input_one {
  width: 100%; /* w-full */
  border-radius: 8px; /* rounded-lg (8px) */
  border: 1px solid var(--stroke-color); /* border & border-stroke */
  background-color: transparent; /* bg-transparent */
  padding-top: 8px; /* py-2 (8px top & bottom padding) */
  padding-bottom: 8px;
  padding-left: 16px; /* px-4 (16px left & right padding) */
  padding-right: 16px;
  margin-top: 8px; /* mt-2 (8px margin top) */
  outline: none; /* outline-none */
}

.input_one:focus {
  border-color: var(--primary-color); /* focus:border-primary */
}

.input_one:focus-visible {
  box-shadow: none; /* focus-visible:shadow-none */
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6); 
  display: flex; 
  justify-content: center;
  align-items: center;
  z-index: 1000; 
}

.modal > div {
  background: #fff; 
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 28rem; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
}
  .wrapper {
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 6px;
    width: 100%;
    max-width: 28rem;
    max-height: 100vh;
    gap: 16px;
  }

  .hidden {
    display: none;
  }

`;
document.head.appendChild(style);
