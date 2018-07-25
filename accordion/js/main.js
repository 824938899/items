/**
 * Created by 824938899 on 2018/7/24 0024.
 */
window.onload = function(){
    init()
};

//addEvent

function addEvent(el,type,fn){
    if(el.addEventListener){
        el.addEventListener(type, fn, false);
    }else if(el.attachEvent){
        el.attachEvent('on' + type, function(){
            fn.call(el);
        });

    }else{
        el['on' + type]
    }

}

function removeEvent(el,type,fn){
    if(el.removeEventListener){
        el.removeEventListener(type, fn, false);
    }else if(el.detachEvent){
        el.detachEvent('on' + type, function(){
            fn.call(el);
        });

    }else{
        el['on' + type]
    }

}


function init(){

}


var accordion = (function(){
    var grid = document.getElementsByClassName('grid')[0],
        gridItem = document.getElementsByClassName('grid-item'),
        length_ = gridItem.length,
        initIndex = 0;


        addEvent(grid, 'mouseover', mouseGoods);





    function mouseGoods(e){
        var e = e || window.event,
            tar = e.target || e.srcElement,
            selectParents = selectParent(tar),
            index = Array.prototype.indexOf.call(gridItem, selectParents),
            item;

        if(initIndex !== index){
            initIndex = index;

            for(var i = 0; i < length_; i++){
                item = gridItem[i];

                item.className = 'grid-item';

            }

            //console.log(initIndex);

            gridItem[initIndex].className += ' active';



        }

    }

    function selectParent(target){
        while(target.tagName.toLowerCase() !== 'li'){
            target = target.parentNode;
        }

        return target;
    }

})();
