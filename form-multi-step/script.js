let currentStep = 0;
const form = document.querySelector("form");
const formSteps = document.querySelectorAll(".form-step");

/* steps */
form.addEventListener("click", (event) => {
  if (!event.target.matches("[data-action]")) {
    return;
  }

  const actions = {
    next() {
      if (currentStep >= formSteps.length) {
        return;
      }

      if (!isValidInput()) {
        return;
      }

      currentStep++;
    },
    prev() {
      if (currentStep == 0) {
        return;
      }

      currentStep--;
    },
  };

  const action = event.target.dataset.action;
  actions[action]();

  updateActiveStep();
  updateProgressStep();
});

/* envio do formulário */
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);

  alert(`Obrigado ${data.get("name")}!`);
});

/* update steps */
function updateActiveStep() {
  formSteps.forEach((step) => step.classList.remove("active"));
  formSteps[currentStep].classList.add("active");

  if (currentStep + 1 === formSteps.length) {
    const data = new FormData(form);

    formSteps[currentStep].children
      .item(0)
      .children.item(0).innerHTML = `Obrigado ${data.get("name")}!`;
  }
}

const progressSteps = document.querySelectorAll(".step-progress [data-step]");

function updateProgressStep() {
  progressSteps.forEach((step, idx) => {
    step.classList.remove("active");
    step.classList.remove("done");

    if (idx < currentStep + 1) {
      step.classList.add("active");
    }

    if (idx < currentStep) {
      step.classList.add("done");
    }
  });
}

/* validation */
function isValidInput() {
  const currentFormStep = formSteps[currentStep];
  const formFields = [
    ...currentFormStep.querySelectorAll("input"),
    ...currentFormStep.querySelectorAll("textarea"),
  ];

  return formFields.every((input) => input.reportValidity());
}

/* animation */
formSteps.forEach((formStep) => {
  function addHide() {
    formStep.classList.add("hide");
  }

  formStep.addEventListener("animationend", (event) => {
    addHide();

    formSteps[currentStep].classList.remove("hide");
  });
});
