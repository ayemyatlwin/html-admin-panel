document.addEventListener("click", function (event) {
  if (!event.target.closest(".tags-input")) {
    console.log("Clicked outside .tag-input");
    const dropdown = document.querySelectorAll(".tags-dropdown.active");
    //remove active class
    if (dropdown) {
      dropdown.forEach((ele) => {
        ele.classList.remove("active");
      });
    }
  }
});

window.tagComponent = (
  container,
  tagsArray,
  addNewTag,
  checkAddButton = true
) => {
  console.log("tagsArray", tagsArray);
  const tag_name_eng = crypto.randomUUID();
  const tag_name_mm = crypto.randomUUID();
  let selectedTags = []; // Maintain independent state for each component
  let initialTags = [];
  const tagsContainer = document.createElement("div");
  const hiddenInput = createhiddenInput(container);
  const input = createInput();
  const tagsDropdown = document.createElement("ul");
  const inputWrapper = document.createElement("div");
  const model_container = document.createElement("div");
  let addButton = null;
  let model_wrapper = null;

  const dataValue = container.getAttribute("data-value");
  if (dataValue && selectedTags.length === 0) {
    const selectedIds = dataValue.split(",");

    initialTags = tagsArray.filter((tag) =>
      selectedIds.includes(tag.id.toString())
    );
    selectedTags = [...initialTags];
  }

  if (checkAddButton) {
    addButton = createAddButton();
    model_wrapper = createModelBox();

    addButton.addEventListener("click", () => {
      //tagsDropdown.style.display = "none";
      model_wrapper.style.display = "flex";
    });
  }

  function render() {
    //clearn container
    container.innerHTML = "";

    tagsContainer.classList.add("tags");

    tagsDropdown.classList.add("tags-dropdown", "flex-col", "absolute");
    tagsDropdown.id = "tags-dropdown";

    inputWrapper.classList.add("flex", "items-center", "gap-4", "py-1");

    updateHiddenInput();

    container.appendChild(inputWrapper);
    inputWrapper.appendChild(input);

    //checkClickOutside();

    if (checkAddButton) {
      inputWrapper.appendChild(addButton);
      container.appendChild(model_wrapper);
    }

    // tagsContainer.addEventListener("click", (e) => {
    //   if (e.target.classList.contains("remove-btn")) {
    //     const tagId = e.target.dataset.id;
    //     selectedTags = selectedTags.filter((tag) => tag.id !== parseInt(tagId));
    //     initialTags = initialTags.filter((tag) => tag.id !== parseInt(tagId));
    //     updateHiddenInput(hiddenInput);
    //     renderTags(tagsContainer, selectedTags, initialTags);
    //   }
    //   tagsDropdown.style.display = "none";
    // });

    inputWrapper.appendChild(hiddenInput);
    container.appendChild(tagsDropdown);
    container.appendChild(tagsContainer);
    // Render initial tags
    renderTags();
    updateHiddenInput(hiddenInput);
  }

  function createInput() {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Type to search...";
    input.classList.add("tags-input", "py-4");
    input.addEventListener("focus", (event) => {
      input.classList.add("active");
      event.stopPropagation();
      renderDropdown();
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

  function renderDropdown() {
    const dropdown = document.querySelectorAll(".tags-dropdown");
    //remove active class
    if (dropdown) {
      dropdown.forEach((ele) => {
        ele.classList.remove("active");
      });
    }

    tagsDropdown.innerHTML = "";
    //add class active
    tagsDropdown.classList.add("active");
    //style with border
    tagsDropdown.style.border = "1px solid #032A5F";

    tagsArray.forEach((tag) => {
      const item = document.createElement("li");
      item.textContent = tag.name;

      const isSelected = selectedTags.some(
        (selectedTag) => selectedTag.id === tag.id
      );

      if (isSelected) {
        item.classList.add("disabled");
      } else {
        item.addEventListener("click", () => {
          selectedTags.push(tag);
          updateHiddenInput();
          renderTags();
          tagsDropdown.innerHTML = "";
        });
      }
      tagsDropdown.appendChild(item);
    });
  }

  function updateHiddenInput() {
    const selectedId = selectedTags.map((selectedTag) => selectedTag.id);
    hiddenInput.value = selectedId.join(",");
  }

  function renderTags() {
    console.log("initialTags", initialTags);
    tagsContainer.innerHTML = "";

    selectedTags.forEach((tag, index) => {
      const tagElement = document.createElement("div");
      tagElement.classList.add("tag");
      tagElement.textContent = tag.name;

      const removeBtn = document.createElement("button");
      removeBtn.classList.add("remove-btn");
      removeBtn.setAttribute("data-id", tag.id);
      removeBtn.textContent = "×";

      removeBtn.addEventListener("click", () => {
        selectedTags = selectedTags.filter(
          (selectedTag) => selectedTag.id !== tag.id
        );

        updateHiddenInput(hiddenInput);
        renderTags();
      });

      tagElement.appendChild(removeBtn);
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

  function createModelBox() {
    console.log("tag_name", tag_name_eng, tag_name_mm);

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

    const savebutton = modelSaveButton(model_wrapper);
    const cancelButton = modelCancelButton(model_wrapper);

    modelbutton.appendChild(savebutton);
    wrapper.appendChild(modelbutton);

    modelbutton.appendChild(cancelButton);
    models.appendChild(modelbutton);

    return model_wrapper;
  }

  function modelSaveButton(model_wrapper) {
    // save button
    const savebutton = document.createElement("button");
    savebutton.innerText = "Save";
    savebutton.type = "button";
    savebutton.classList.add("px-6", "py-2", "rounded-lg");
    savebutton.style.backgroundColor = "#032A5F";
    savebutton.style.color = "white";
    savebutton.style.width = "200px";
    savebutton.addEventListener("click", () => {
      console.log("save button clicked");
      const newTag = document.getElementById(tag_name_eng).value.trim();
      const newTagMM = document.getElementById(tag_name_mm).value.trim();
      if (!newTag || !newTagMM) return;
      addNewTag(newTag, newTagMM, addCreatedTag);

      console.log("model_wrapper", model_wrapper);
      model_wrapper.style.display = "none";
      tagsDropdown.style.display = "none";

      document.getElementById(tag_name_eng).value = "";
      document.getElementById(tag_name_mm).value = "";
    });
    return savebutton;
  }

  function modelCancelButton(model_wrapper) {
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
    return cancelButton;
  }

  function addCreatedTag(obj) {
    tagsArray.push(obj);
    selectedTags.push(obj);
    updateHiddenInput();
    renderTags();
  }

  render();
};

// function addTag(tag, tagsContainer, selectedTags, tag_name_eng, tag_name_mm) {
//   if (!selectedTags.includes(tag)) {
//     selectedTags.push(tag);
//     renderTags(tagsContainer, selectedTags, []);
//     document.getElementById(tag_name_eng).value = "";
//     document.getElementById(tag_name_mm).value = "";
//   }
//   tagsDropdown.style.display = "none";
// }

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
    display:none;
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

  .tags-dropdown.active {
     display:flex 
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
