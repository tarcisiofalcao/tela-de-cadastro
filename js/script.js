class Validator{

    constructor(){
        this.validations = [
            'data-min-length',
        ]
    }
    //Iniciar a validação de todos os campos
    validate(form){
        //Pegar os inputs
        let inputs = document.getElementsByTagName('input');
        //Trasformar a HTMLCollection em Array
        let inputsArray = [...inputs];
        //Loop nos inputs e validação mediante o que for encontrado
        inputsArray.forEach(function(input){
            //loop em todas as validações existentes
            for(let i = 0; this.validations.length > i; i++){
                //Verifica se a validação atual existe no input
                if(input.getAttribute(this.validations[i]) != null){
                    //limpando a string para virar um método
                    let method = this.validations[i].replace('data-', '').replace('-','');

                    //valor do input
                    let value = input.getAttribute(this.validations[i]);

                    //invocar o método
                    this[method](input, value);
                }
            }
        }, this)
        
    }
    //verificar se o input tem um numero minimo de caracteres
    minlength(input, minValue){
        let inputLength = input.value.length;
        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres.`

        if(inputLength < minValue){
            
            this.printMessage(input, errorMessage);
        }

    }
    printMessage(input, msg){
        let template = document.querySelector('.error-validation').cloneNode(true);
        template.textContent = msg;


        let inputParent = input.parentNode;
        template.classList.remove('template');
        inputParent.appendChild(template);
    }

   
}

let form = document.querySelector('#register-form');
let submit = document.querySelector('#btn-submit');

let validator = new Validator();

submit.addEventListener('click', (e)=>{

    e.preventDefault();
    validator.validate(form)
})