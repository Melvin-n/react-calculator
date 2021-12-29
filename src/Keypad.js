import React, {useState, useEffect, useLayoutEffect} from 'react'

export default function Keypad() {

    //object array for creating buttons
    const buttonList = [
        {
            name: '=',
            class: 'number-button',
            id: 'equals',
            value: '='
        },
        {
            name: '0',
            class: 'number-button',
            id: 'zero',
            value: 0
        },
        {
            name: '1',
            class: 'number-button',
            id: 'one',
            value: 1
        },
        {
            name: '2',
            class: 'number-button',
            id: 'two',
            value: 2
        },
        {
            name: '3',
            class: 'number-button',
            id: 'three',
            value: 3
        },
        {
            name: '6',
            class: 'number-button',
            id: 'six',
            value: 6
        },
        {
            name: '5',
            class: 'number-button',
            id: 'five',
            value: 5
        },
        
        {
            name: '4',
            class: 'number-button',
            id: 'four',
            value: 4
        },
        {
            name: '9',
            class: 'number-button',
            id: 'nine',
            value: 9
        },
        {
            name: '8',
            class: 'number-button',
            id: 'eight',
            value: 8
        },
        
        {
            name: '7',
            class: 'number-button',
            id: 'seven',
            value: 7
        },
        {
            name: '.',
            class: 'number-button',
            id: 'decimal',
            value: '.'
        },
        {
            name: '÷',
            class: 'operator-button',
            id: 'divide',
            value: '/'
        },
        {
            name: '×',
            class: 'operator-button',
            id: 'multiply',
            value: '*'
        },
        {
            name: '-',
            class: 'operator-button',
            id: 'subtract',
            value: '-'
        },
        {
            name: '+',
            class: 'operator-button',
            id: 'add',
            value: '+'
        },
        {
            name: 'C',
            class: 'clear-button',
            id: 'clear',
            value: ''
        }

    ]

    
    const operators = ['+', '-', '/', '*', '=' ]

    //useState variables
    const [input, setInput] = useState('')
    const [inputHistory, setInputHistory] = useState('')
    const [display, setDisplay] = useState(0)
    const [operand, setOperand] = useState('')
    const [result, setResult] = useState('')
    const [prevInput, setPrevInput] = useState('')
    const [prevNumber, setPrevNumber] = useState('')
    const [operatorArray, setOperatorArray] = useState([])

    //main function for handling all button clicks
    const handleClick = (e) => {
        
        console.log(prevInput)
        //clearing out all variables when clear button is pressed
        if (e.target.id === 'clear') {
            console.log('empty')
            setDisplay(0)
            setResult('')
            setInputHistory('')
            setInput('')
            setPrevNumber('')
            return
        }
        //check for multiple 0 inputs in a row
        if (prevInput == 0 && e.target.value == 0) {
            console.log(inputHistory)
            return
        }

        //check for multiple . inputs in a row or within a number
        if (prevInput == '.' && e.target.value == '.' ||
            prevNumber.includes('.') &&  e.target.value == '.'
            ) {
            return
        }
        
        //update all variables with new input
        setInput(input => input + e.target.value)
        setInputHistory(inputHistory !== 0 ? inputHistory + e.target.value : e.target.value)
        setPrevInput(e.target.value)
        setPrevNumber(prevNumber + e.target.value)
        

        //if user clicks operator, save the operator to use in the next calculation
        if (operators.includes(e.target.value) && result === ('')) {
            setResult(input)
            setInput(prevNumber)   
            setPrevNumber('')       
        }   
        
        //switch case for different operators, set display to the result        
        if (operators.includes(e.target.value)) {
            //operator array will keep track of how many operators are inputted in a row
            setOperatorArray([...operatorArray, e.target.value])
            //check for multiple operators in a row, use last one. take into account negative value of - operator
            if (operators.includes(prevInput)) {
                if (operatorArray.length > 1) {
                    if (operatorArray.includes('-')) {
                        setInput(input.slice(2, input.length))
                        console.log(input)
                    }
                    setOperand(e.target.value)
                    return
                }
                if (e.target.value == '-') {
                    return
                }
                if (prevInput == '-') {
                    console.log('ayayay')
                    return
                }
                setInput(prevNumber)
                setOperand (e.target.value)
                return
            }
            //if none of the above cases are met, operand is last input value
            setOperand (e.target.value)
            //reset values
            setPrevNumber('')
            setInput('')
            //operation functions based on operands
                switch (operand) {
                    case '+':
                        setResult(parseFloat(result) + parseFloat(input))                
                        break;
                    case '-':
                        setResult(parseFloat(result) - parseFloat(input))
                        break;
                    case '*':
                        setResult(parseFloat(result) * parseFloat(input))
                        break;
                    case '/':
                        setResult(parseFloat(result) / parseFloat(input))
                        break;
                    default:
                        return
                    
                }                 
        }       
    }
    //when the result is updated, show it on the display
    //used uselayouteffect due to freecodecamp not reading dom updates from useeffect
    useLayoutEffect(() => {
        setDisplay(result)
        if (prevInput == '=') {
            setInputHistory(result)
            setOperatorArray([])
            
        }
    }, [result])

    return (
        <div id='container'>
            <div id='display-area'>
                <div id='input-area'>{display}</div>
                <input type='text' id='display' value={inputHistory || 0} />         
            </div>
            <div id='button-container'>
                {buttonList.reverse().map(button => (
                    <button className={button.class} id={button.id} 
                    value={button.value} onClick={(e) => handleClick(e)}>
                    {button.name}
                    </button>
                ))}
            </div>
            
            
            
        </div>
    )
}
