class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement=previousOperandTextElement
        this.currentOperandTextElement=currentOperandTextElement
    }
    clear(){
        this.currentOperand=''
        this.previousOperand=''
        this.opereation=undefined

    }
    delete(){
        this.currentOperand=String(this.currentOperand).slice(0,-1)

    }
    appendNumber(number){
        if(number==='.' && this.currentOperand.includes('.')) return
        if(String(this.currentOperand)==='undefined') this.currentOperand=String(number)
        else this.currentOperand=this.currentOperand + number
    }
    chooseOperation(opereation){
        if(this.currentOperand==='') return
        if(this.previousOperand !== '') {
            this.compute()
        }
        this.opereation=opereation
        this.previousOperand=this.currentOperand
        this.currentOperand=''

    }
    compute(){
        let computation
        const prev= parseFloat(this.previousOperand)
        const current= parseFloat(this.currentOperand)
        if(isNaN(prev)|| isNaN(current)) return 
        switch(this.opereation) {
            case '+':
                computation=prev + current
                break
            case '-':
                computation=prev - current
                break
            case '*':
                computation=prev * current
                break
            case '÷':
                computation=prev / current
                break
            default :
            return
        }
        this.currentOperand=computation
        this.opereation=undefined
        this.previousOperand=''

    }
    updateDisplay(){
        this.currentOperandTextElement.innerText =this.currentOperand
            if(String(this.opereation) !='undefined')
            this.previousOperandTextElement.innerText=`${this.previousOperand} ${this.opereation}`
      

    }
}

const numberButtons=document.querySelectorAll('[data-number]')
const operationButtons=document.querySelectorAll('[data-operation]')
const equalsButton=document.querySelector('[data-equals]')
const deleteButton=document.querySelector('[data-delete]')
const allClearButton=document.querySelector('[data-all-clear]')
const previousOperandTextElement=
document.querySelector('[data-previous-operand]')
const currentOperandTextElement=
document.querySelector('[data-current-operand]')

const calculator =new Calculator(previousOperandTextElement,
    currentOperandTextElement)
    numberButtons.forEach(button => {
        button.addEventListener('click',() => {
            calculator.appendNumber(button.innerText)
            calculator.updateDisplay()
        })    
    })
    operationButtons.forEach(button => {
        button.addEventListener('click',() => {
            calculator.chooseOperation(button.innerText)
            calculator.updateDisplay()
        })    
    })

    equalsButton.addEventListener('click',() => {
        calculator.compute()
        calculator.updateDisplay()
        calculator.clear();
    })
    allClearButton.addEventListener('click',() => {
        calculator.clear()
        calculator.updateDisplay();
    })
    deleteButton.addEventListener('click',() => {
        calculator.delete()
        calculator.updateDisplay();
    })