$(document).ready(function(){

    var localhostTest = new RegExp(location.host);
    
    function loadLocal(file){
        var $article = $('article.markdown-body');
        $article.load(file + '.md.html',function(){
            $article.find('a').each(function(){
                if(localhostTest.test(this.href)){
                    var file = this.pathname;
                    console.log(this.pathname);
                    $(this).click(function(event){
                        loadLocal(file);
                        event.preventDefault();
                    });
                }
            });
        });
    }

    $('body > div > h3').click(function(){
        loadLocal('html/index');
    });
    loadLocal('html/index');
});
