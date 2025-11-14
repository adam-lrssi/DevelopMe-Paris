document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('.form')
    const stepContainer = form.querySelector('.step-container')
    const steps = form.querySelectorAll('.step')
    const stepIndicators = form.querySelectorAll('.progress-container li')
    const progress = form.querySelector('.progress')
    const prevButton = form.querySelector('.prev-btn')
    const nextButton = form.querySelector('.next-btn')
    const submitButton = form.querySelector('.submit-btn')

    document.documentElement.style.setProperty('--steps', stepIndicators.length)

    let currentStep = 0;

    const updateProgress = () => {
        let width = currentStep / (stepIndicators.length - 1);
        progress.style.transform = `scaleX(${width})`;

        stepContainer.style.height = steps[currentStep].offsetHeight + "px";

        stepIndicators.forEach((indicator, index) => {
            indicator.classList.toggle('current', currentStep === index)
            indicator.classList.toggle('done', currentStep > index)
        })

        steps.forEach((step, index) => {
            step.style.transform = `translateX(-${currentStep * 100}%)`
            step.classList.toggle('current', currentStep === index)
        })

        updateButton()
    }

    const updateButton = () => {
        prevButton.hidden = currentStep === 0;
        nextButton.hidden = currentStep >= stepIndicators.length - 1;
        submitButton.hidden = !nextButton.hidden;
    }

    const isValidStep = () => {
        const fields = steps[currentStep].querySelectorAll('input, checkbox, textarea, select')
        return [...fields].every((field) => field.reportValidity())
    }

    // event listeners

    const inputs = form.querySelectorAll('input, textarea, select, checkbox')
    inputs.forEach(input => input.addEventListener('focus', (e) => {
        const focusedElement = e.target;

        const focusedStep = [...steps].findIndex(step => step.contains(focusedElement));

        if(focusedStep !== - 1 && focusedStep !== currentStep) {
            currentStep = focusedStep;
            updateProgress();
        }

        stepContainer.scrollTop = 0
        stepContainer.scrollLeft = 0
    }))


    prevButton.addEventListener('click', (e) => {
        e.preventDefault();

        if(currentStep > 0) {
            currentStep--;
            updateProgress();
        }
    })
    nextButton.addEventListener('click', (e) => {
        e.preventDefault();

        if(!isValidStep()) return

        if(currentStep < stepIndicators.length - 1) {
            currentStep++;
            updateProgress();
        }
    })
    updateProgress()
})