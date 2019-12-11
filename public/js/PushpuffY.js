var x = 1;
var xs = "";
var onoff = 0;
var pushobject = {
	"0": "エラー",
};
var limit = Object.keys(pushobject).length;
var pushMake = ()=>{
    xs = x.toString();
    Push.create(pushobject["0"], {
          body: pushobject[xs]
    });
    x = x + 1
    if(x >= limit){
        x = 1;
    };
    console.log(limit);
}
var pushSet = ()=>{ const timer =　setInterval(()=>{
	if( onoff == 0){
		clearInterval(timer);
	}else if(onoff == 1){
	   pushMake();
	}
}
,10000);};
var subNone = ()=>{
    var subjects = document.getElementsByClassName("subflex")
                var index = 0, length = subjects.length;
                for ( ; index < length; index++) {
                    subjects[index].style.display = "none";
                }
};
new Vue ({
    el: '.main2',
    data: {
        message: 'ファイルが選択されておりません'
    },
    methods: {
        change:function(subject){
            const promise = new Promise((resolve)=>{
                subNone();
                resolve();
            });
            promise.then(()=>{
                document.getElementById(`F${subject}`).style.display = "flex";
            });
        },
        pageChange:function(){
            document.getElementById("nav2").style.display = "none";
	        document.getElementById("nav").style.display = "flex";
        },
        pageBack:function(){
            document.getElementById("nav").style.display = "none";
	        document.getElementById("nav2").style.display = "flex";
        },
        fileRead:function(event){
            Push.create("ファイルが指定されました");
            var file = event.target.files[0];
            this.message = event.target.files[0].name;
            var reader = new FileReader();
            reader.addEventListener('load',()=>{
                pushobject = JSON.parse(reader.result);
                limit = Object.keys(pushobject).length;
            });
            reader.readAsText(file);
        },
        dragOver:function(){
            event.preventDefault();
        },
        dragEnter:function(){
            document.getElementById("fileDrag").classList.remove("fileDrag");
	        document.getElementById("fileDrag").classList.add("fileDragEnter");
        },
        dragLeave:function(){
            document.getElementById("fileDrag").classList.remove("fileDragEnter");
	        document.getElementById("fileDrag").classList.add("fileDrag");
        },
        dragRead:function(){
            event.preventDefault();
            document.getElementById("fileDrag").classList.remove("fileDragEnter");
	        document.getElementById("fileDrag").classList.add("fileDrag");
            Push.create("ファイルが指定されました");
            var file =　event.dataTransfer.files[0];
            this.message = event.dataTransfer.files[0].name;
            var reader = new FileReader();
            reader.addEventListener('load',()=>{
                pushobject = JSON.parse(reader.result);
                limit = Object.keys(pushobject).length;
            });
            reader.readAsText(file);
        },
        pushTest:function(){
            Push.create("通知は正常に送られました");
        },
        pushStart:function(){
        	if (onoff == 0){
	        	Push.create("通知が開始されました");
	        	onoff = 1;
	        	pushSet();
	        	console.log(onoff);
	        	document.getElementById("onoff").classList.remove("parts3");
	        	document.getElementById("onoff").classList.add("parts3on");
        	}else if( onoff == 1){
        		Push.create("通知が終了されました");
        		onoff = 0;
        		console.log(onoff);
        		document.getElementById("onoff").classList.remove("parts3on");
	        	document.getElementById("onoff").classList.add("parts3");
        	}
        },
        pushSelect:function(eventname){
        	Push.create("科目が指定されました");
        	fetch(`JSON/${eventname}.json`)
        	.then((response) => response.text())
        	.then(
        		(text) => {
        			pushobject = JSON.parse(text);
        		}
        	);
        }
    }
})