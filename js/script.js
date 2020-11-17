class Validator{

    constructor(){
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-email-validate',
            'data-only-letters',
            'data-equal',
            'data-password-validate',
            'data-checked'
        ]
    }
    //Iniciar a validação de todos os campos
    validate(form){

        //apagar as mensagens de erro
        let currentValidations = form.querySelectorAll('.error-validation');

        if(currentValidations.length > 0){
            this.cleanValidations(currentValidations);
        }
        //Pegar os inputs
        let inputs = form.getElementsByTagName('input');
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
        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`

        if(inputLength < minValue){
            this.printMessage(input, errorMessage);
        }

    }

    maxlength(input, maxValue){
        let inputLength = input.value.length;
        let errorMessage = `O campo não pode ter mais que ${maxValue} caracteres`;

        if(inputLength > maxValue){
            this.printMessage(input, errorMessage);
        }
    }

    emailvalidate(input){
        let regex = /\S+@\S+\.\S+/;
        let email = input.value;

        let errorMessage = 'Insira um e-mail no padrão tarcisio@email.com';

        if(!regex.test(email)){
            this.printMessage(input, errorMessage);
        }
    }

    onlyletters(input){
        let regex = /^[A-Za-z]+$/
        let text = input.value;

        let errorMessage = 'Este campo não aceita números nem caracteres';
        if(!regex.test(text)){
            this.printMessage(input, errorMessage);
        }
    }

    passwordvalidate(input){
        let charArray = input.value.split("");

        let uppercases = 0;
        let numbers = 0;

        for(let i = 0; charArray.length > i; i++){
            if(charArray[i] === charArray[i].toUpperCase() && isNaN(parseInt(charArray[i]))){
                uppercases++;
            }else if(!isNaN(parseInt(charArray[i]))){
                numbers++;
            }
        }

        if(uppercases === 0 || numbers === 0){
            let errorMessage = 'Sua senha precisa ter pelo menos uma letra maiúscula e um número';

            this.printMessage(input, errorMessage);
        }
    }

    equal(input, inputName){
        let inputToCompare = document.getElementsByName(inputName)[0];

        let errorMessage = `Este campo deve ser igual ao ${inputName}`;

        if(input.value !== inputToCompare.value){
            this.printMessage(input, errorMessage);
        }
    }

    required(input){
        let inputValue = input.value;
        if(inputValue === ''){
            let errorMessage = 'Este campo é obrigatório.'

            this.printMessage(input, errorMessage);
        }
    }

    checked(input){
        if(!input.checked){
            let errorMessage = 'Você precisa aceitar os termos de uso'
            this.printMessage(input, errorMessage);
        }
    }

    printMessage(input, msg){

        let errorsQty = input.parentNode.querySelector('.error-validation');

        if(errorsQty === null){
         
        let template = document.querySelector('.error-validation').cloneNode(true);
        template.textContent = msg;

        let inputParent = input.parentNode;
        template.classList.remove('template');
        inputParent.appendChild(template);
        }
    }

    cleanValidations(validations){
        validations.forEach(el => el.remove());
    }

   
}

let form = document.querySelector('#register-form');
let submit = document.querySelector('#btn-submit');

let validator = new Validator();

submit.addEventListener('click', (e)=>{

    e.preventDefault();
    validator.validate(form)
})