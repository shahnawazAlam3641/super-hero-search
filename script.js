const input = document.querySelector("input");
const btn = document.querySelector("button");
const img = document.querySelector("img");

// const slogan = document.querySelector(".init-body")

const multi = document.querySelector(".multi");
const mainMulti = document.querySelector(".main-multi");

const heroBody = document.querySelector(".hero-body")
const heroName = document.querySelector(".hero-name")

const heroInfo = document.querySelectorAll(".data-span")



// console.log(input.value)



const accessToken = "1010632133479619"
const url = `https://superheroapi.com/api/${accessToken}/search/`

let obj = {}

// console.log(url)


async function findSuperhero(e){
    e.preventDefault()
    // console.log("func", input.value,url)

    const response = await fetch(url+input.value.toLowerCase())
    const data = await response.json()

    // console.log("func",url,input.value.replace(/\s/g, ""))

    // console.log(data)

    renderData(data)

    
}

function  renderOnUi(data){
    // console.log(data)
    heroBody.style.display = 'flex'

    const {results:[{biography:{"full-name":fullName,aliases,"first-appearance":firstAppearance,publisher,alignment},powerstats:{intelligence,strength,speed,durability,power,combat}}]} = data
    // const { results } = data; // Assuming yourObject is the entire response object

    // // Destructuring the specific properties for Nick Fury
    // const [nickFury] = results;
    
    // const { 
    //   biography: { "full-name": fullNameNickFury, "first-appearance": firstAppearanceNickFury, publisher: publisherNickFury, aliases: aliasesNickFury, alignment: alignmentNickFury },
    //   powerstats: { intelligence: intelligenceNickFury, strength: strengthNickFury, speed: speedNickFury, durability: durabilityNickFury, power: powerNickFury, combat: combatNickFury }
    // } = nickFury;






    heroInfo.forEach( (elem)=>{
        // elem.innerHTML = `${elem.id}:  ${elem.id.replace(/"/g, '')}`
        elem.innerHTML = eval(elem.id)
    } )

}


async function renderClicked(id){
    const response = await fetch(`https://www.superheroapi.com/api.php/1010632133479619/${id}`)
    const data = await response.json()
    let {name,biography:{"full-name":fullName,aliases,"first-appearance":firstAppearance,publisher,alignment},powerstats:{intelligence,strength,speed,durability,power,combat},image:{url}} = data
    const arr = [name,fullName,aliases,firstAppearance,publisher,alignment,intelligence,strength,speed,durability,power,combat,url]
    
    // arr.forEach( function(myArr){
    //     if(myArr === "null"){
    //         console.log(myArr)
    //         myArr = "No Data Available"
    //         console.log(myArr)
    //     }
    // } )

    img.src = url
    heroName.innerHTML = name


    heroInfo.forEach( (elem)=>{

        // console.log(eval(elem.id))

        // if(eval(elem.id) === "null"){
        //     // console.log(myArr)
        //     eval(elem.id) = "No Data Available"
        //     // console.log(myArr)
        // }
        // elem.innerHTML = `${elem.id}:  ${elem.id.replace(/"/g, '')}`
        elem.innerHTML = eval(elem.id)
    } )


    
    
    
    
    
    

}


function renderData(data) {

    

    multi.innerHTML = "";

    if(data?.results.length <2){
        heroBody.style.display = "flex";
        multi.style.display = 'none';
        // slogan.style.display = 'none';
        
        img.src = data?.results[0]?.image?.url
        heroName.innerHTML = data?.results[0]?.name

        renderOnUi(data)


    }else if(data?.results.length >1){

        // slogan.style.display = 'none';
        heroBody.style.display = "none";
        multi.style.display = "flex";


        data.results.map( (hero)=>{


            

            const multiChild = document.createElement('div')
            multiChild.classList.add('multi-child')

            const img = document.createElement('img')
            const p = document.createElement('p')

            img.classList.add('multihero-img'); 
            p.classList.add('multihero-name');

            multiChild.appendChild(img)
            multiChild.appendChild(p)

            const multiContainer = document.createElement("div");
            multiContainer.classList.add('multi-container');
            multiContainer.style.display = 'flex';
            
            // multiContainer.id.add(hero?.id);
            multiContainer.setAttribute("id",hero?.id);

            multi.appendChild(multiContainer)

            multiContainer.appendChild(multiChild);


            img.src = hero?.image?.url
            p.innerHTML = hero?.name

            mainMulti.style.display = 'flex'

            // console.log(multiContainer)


            const multiContainerArr = document.querySelectorAll('.multi-container')
            multiContainerArr.forEach( function (container) {
                container.addEventListener('click', function (e) {

                    console.log(container.id)

                    mainMulti.style.display = 'none'
                    heroBody.style.display = 'flex'
                    renderClicked(container.id)
                    





                })
            })




        } )
    }

    


    

}


btn.addEventListener("click", findSuperhero)

