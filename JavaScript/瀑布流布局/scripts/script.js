window.onload = function(){
	waterfall('main','box');
	var dataInt={'data':[{'src':'0 (1).jpg'},{'src':'0 (2).jpg'},{'src':'0 (3).jpg'},{'src':'0 (4).jpg'}]};
	window.onscroll = function(){
		if(checkScrollSlide()){
			var oParent = document.getElementById('main');
			//将数据块渲染到页面的尾部
			for (var i = 0; i < dataInt.data.length; i++) {
				var oBox =document.createElement('div');
				oBox.className='box';
				oParent.appendChild(oBox);
				var oPic = document.createElement('div');
				oPic.className = 'pic';
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src = "./images/"+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main','box');
		}
	}
}

function waterfall(parent,box){
	//将main下的所有class为box的元素取出来
	var oParent  =document.getElementById(parent);
	var oBoxs = getByClass(oParent,box);
	//计算整个页面显示的列数（页面宽/box的宽）
	var oBoxW = oBoxs[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
	//设置main的宽
	oParent.style.cssText = 'width:'+oBoxW*cols+'px;margin:0 auto;';
	//存放每一列高度的数组
	var hArr = [];
	for (var i = 0; i < oBoxs.length; i++) {
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			//Math.min.apply(null,hArr); 第一个参数是null的情况下，
			//this指向window,调用全局函数Math.min()方法。求出最小值
			var minH = Math.min.apply(null,hArr);
			var index = getMinhIndex(hArr,minH);
			//hArr.indexOf(minH);返回hArr数组中的minH的索引
			oBoxs[i].style.position = 'absolute';
			oBoxs[i].style.top = minH + 'px';
			//oBoxs[i].style.left = oBoxW*index + 'px';
			oBoxs[i].style.left = oBoxs[index].offsetLeft + 'px';
			hArr[index]+=oBoxs[i].offsetHeight;
		}
	}
}

//根据class获取元素
function getByClass(parent,clsName){
	var boxArr = new Array();
	oElements = parent.getElementsByTagName('*');
	for (var i = 0; i < oElements.length; i++) {
		if(oElements[i].className == clsName){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}

//得到索引值
function getMinhIndex(arr,val){
	for(var i in arr){
		if(arr[i]==val){
			return i;
		}
	}
}

//检测是否具备了滚动加载数据块的条件
function checkScrollSlide(){
	var oParent  =document.getElementById('main');
	var oBoxs = getByClass(oParent,'box');
	var lastBoxH = oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	//混杂模式和标准模式
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.documentElement.clientHeight || document.body.clientHeight;
	return (lastBoxH<scrollTop+height)?true:false;
}