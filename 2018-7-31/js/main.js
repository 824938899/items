window.onload = function() {
	init();
}

function init() {
	navShow();
}

var navShow = (function() {

	var menuBox = $class('menu-box')[0],
		menuAll = $classF(menuBox, 'menu')[0],
		menuNavItems = $classF(menuBox, 'menu-nav-item'),
		menuNavItemsLength = menuNavItems.length,
		menuNavItem,
		menuCon = $classF(menuBox, 'menu-con')[0],
		menuConItems = $classF(menuBox, 'menu-con-item'),
		menuConItemsLength = menuConItems.length,
		menuConItem,
		t = null,
		isMenuCon = false,
		mousePoses = [],
		isFirst = true;


	addEvent(menuAll, 'mouseenter', function() {
		addEvent(document, 'mousemove', mouseMove)
	})



	addEvent(menuBox, 'mouseleave', menuMouseOut);

	addEvent(menuCon, 'mouseenter', function() {
		isMenuCon = true;
	});

	addEvent(menuCon, 'mouseleave', function() {
		isMenuCon = false;
	});


	for (var i = 0; i < menuNavItemsLength; i++) {
		menuNavItem = menuNavItems[i];
		addEvent(menuNavItem, 'mouseenter', hoverMenu)
	}



	function hoverMenu(e) {
		canceBubble(e);
		var e = e || window.event,
			tar = e.target || e.srcElement,
			thisIndex = Array.prototype.indexOf.call(menuNavItems, tar),
			newPos = mousePoses[1] || {
				x: 0,
				y: 0
			},
			oldPos = mousePoses[0] || {
				x: 0,
				y: 0
			},
			flag = doTimeout(newPos, oldPos);


			menuCon.className = 'menu-con';

		if (t) clearTimeout(t);
		
		if (!isFirst) {
			if (flag) {
				t = setTimeout(function() {
					if (isMenuCon) {
						console.log(isMenuCon);
						return;
					}
					addClassName(thisIndex);
					
					t = null;
				}, 500)
			} else {
				addClassName(thisIndex);
			}
		}else{
			addClassName(thisIndex);
			isFirst = false;
		}



		//console.log('a: { x:' + oldPos.x + ' y:' + oldPos.y + ' }  p: { x:' + newPos.x + " y:" + newPos.y + ' }');

		//console.log(flag);

	}

	function addClassName(index) {
		removeClassNmae();
		menuNavItems[index].className += ' active';
		menuConItems[index].className += ' active';
	}

	function removeClassNmae() {
		for (var i = 0; i < menuNavItemsLength; i++) {
			menuNavItem = menuNavItems[i];
			menuConItem = menuConItems[i];
			menuNavItem.className = 'menu-nav-item';
			menuConItem.className = 'menu-con-item';

		}
	}

	function menuMouseOut() {
		menuCon.className += ' hide';
		removeClassNmae();
		removeEvent(document, 'mousemove', mouseMove);
	}


	function mouseMove(e) {
		var e = e || window.event;

		mousePoses.push({
			x: pagePos(e).X,
			y: pagePos(e).Y
		})

		if (mousePoses.length > 2) {
			mousePoses.shift();
		}
	}


	function doTimeout(p, a) {
		var topLeft = {
				x: getStyle(menuBox, 'margin-left') + getStyle(menuAll, 'width') + getStyle($class('container')[0], 'margin-left'),
				y: getStyle($class('container')[0], 'padding-top')
			},
			bottomLeft = {
				x: getStyle(menuBox, 'margin-left') + getStyle(menuAll, 'width') + getStyle($class('container')[0], 'margin-left'),
				y: getStyle($class('container')[0], 'padding-top') + getStyle(menuAll, 'height')
			};

		return pointInTriangle({
			curPos: p,
			lastPos: a,
			topLeft: topLeft,
			bottomLeft: bottomLeft
		})
	}
})