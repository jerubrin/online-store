import './style.scss';
import { iComponent } from '../component';
import Loader from '../../../model/loader';
import { iCartData } from '../../../model/model';
import { components } from '../../../model/comp-factory';
const optionsArr = ['По алфавиту','По цене - высокая','По цене - низкая']
export class CardList implements iComponent {
    async render(root: HTMLElement) {
        const $cardConteiner = document.createElement('div');
        $cardConteiner.className = 'card-conteiner'

        let loadedData:iCartData[] = await new Loader().getSources()
        function draw(){
          loadedData.forEach(element => {
            const $card = document.createElement('div');
            components.getCard(element).render($card)
            $cardConteiner.append($card)
          });
        } 
    
        function removeList(){
          $cardConteiner.innerHTML = ''
        }

        const $sortConteiner = document.createElement('div');
        $sortConteiner.className = 'sort-conteiner'

        const $select = document.createElement('select');
        const $option = document.createElement('option');
        $option.textContent = 'Сортировать по:'
        $select.append($option)

        optionsArr.forEach((item:string) => {
          const $option = document.createElement('option');
          $option.textContent = item
          $select.append($option)
        })

        $select.addEventListener('change',()=>{
            if($select.value === 'По алфавиту'){
              loadedData.sort((item1,item2)=>{
                return item1.title.localeCompare(item2.title)})
            }
            if($select.value === 'По цене - высокая'){
              loadedData.sort((item1,item2)=>item2.price - item1.price)
            }
            if($select.value === 'По цене - низкая'){
              loadedData.sort((item1,item2)=>item1.price - item2.price)
            }
            removeList();
            draw();
        })


        const $btnsBlock = document.createElement('div');
        const btnList =  document.createElement('button');
        btnList.textContent = 'Списком'
        btnList.addEventListener('click',()=>{
          $cardConteiner.classList.add('sort-conteiner-list')
          for(let i=0;i<$cardConteiner.children.length;i++){
            $cardConteiner?.children[i]?.firstElementChild?.classList.add('card-list-elem')
         }
        })

        const btnImage =  document.createElement('button');
        btnImage.textContent = 'Плиткой'
        btnImage.addEventListener('click',()=>{
          $cardConteiner.classList.remove('sort-conteiner-list')
          for(let i=0;i<$cardConteiner.children.length;i++){
            $cardConteiner?.children[i]?.firstElementChild?.classList.remove('card-list-elem')
         }
        })

        $btnsBlock.append(btnList,btnImage)

        $sortConteiner.append($select,$btnsBlock)
        root.append($sortConteiner,$cardConteiner);
        draw()
    }
}
