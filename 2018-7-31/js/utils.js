//获取dom对象

function $class(elem){
    return document.getElementsByClassName(elem);
}

function $classF(parentElem,childElem){
    return parentElem.getElementsByClassName(childElem);
}



// 获取坐标
function pagePos(e) {
    var sLeft = getScrollOffset().left,
        sTop = getScrollOffset().top,
        // 这两个是获取偏移量
        cLeft = document.documentElement.clientLeft || 0,
        cTop = document.documentElement.clientTop || 0;

    return {
        X: e.clientX + sLeft - cLeft,
        Y: e.clientY + sTop - cTop
    }
}

// 获取滚动条距离
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    } else {
        return {
            left: document.body.scrollLeft + document.documentElement.scrollLeft,
            top: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}

// 获取DOM属性
function getStyle(el, attr) {
    if (window.getComputedStyle) {
        if (attr) {
            return parseInt(window.getComputedStyle(el, null)[attr]);
        } else {
            return window.getComputedStyle(el, null);
        }
    } else {
        if (attr) {
            return parseInt(el.currentStyle[attr]);
        } else {
            return el.currentStyle;
        }
    }
}

// 寻找子元素
function elchildren(node) {
    var temp = {
            'length': 0,
            'splice': Array.prototype.splice
        },
        len = node.childNodes.length;
    for (var i = 0; i < len; i++) {
        var childItem = node.childNodes[i];

        if (childItem.nodeType === 1) {
            temp[temp.length] = childItem;
            temp['length']++;
        }
    }
    return temp;
}

// 添加监听事件
function addEvent(el, type, fn) {
    if (el.addEventListener) {
        el.addEventListener(type, fn, false);
    } else if (el.attachEvent) {
        el.attachEvent('on' + type, function () {
            fn.call(el);
        })
    } else {
        el['on' + type] = fn;
    }
}

// 取消监听事件
function removeEvent(elem, type, fn) {
    if (elem.addEventListener) {
        elem.removeEventListener(type, fn, false);
    } else if (elem.attachEvent) {
        elem.detachEvent('on' + type, fn);
    } else {
        elem['on' + 'type'] = null;
    }
}

// 取消冒泡
function canceBubble(ev) {
    var e = ev || window.event;

    if (e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.canceBubble = true;
    }
}

// 取消默认事件
function defaultEvent(ev) {
    var e = ev || window.event;

    if (e.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}

// 获取可视区域大小
function getViewSize() {
    if (false && window.innerWidth) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    } else {
        if (document.compatMode === 'BackCompat') {
            return {
                width: document.body.clientWidth,
                height: document.body.clientHeight
            }
        } else {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        }
    }
}