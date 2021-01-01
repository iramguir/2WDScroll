/*
	* TwoWDScroll 1.0.0 (Alias : 2WDScroll) Alpha
    * Description : Can be used to add custom scrollbar on top of defined element in addition to default scrollbar in bottom, end result is a doubled scrollbar
    * Release : 01/01/2021
    * Author : Indunil Ramadasa 
    * https://guirama.medium.com/ 
    * https://github.com/iramguir/2WDScroll
    * https://www.jsdelivr.com/package/npm/2wdscroll 
    
    * Licensed under the GNU Public license v3.0
*/
(function($) {
	$.fn.TwoWDScroll = function(twoD_width,twoD_minWidth=twoD_width) {
        var this_target =  $('#'+$(this).attr('id'));

            var twod_num_matches = $(this).length;
            var twod_matches = new Array();
            $(this).each(function(index){
                var this_target = $(this).attr('id');
                if(this_target.length > 0)
                    twod_matches.push(this_target);
                else
                    TwoWDScrollError('Matched element with no ID found');
            });
        
        
            for(i=0;i < twod_num_matches; i++ )
            {
                var this_2wd_id = twod_matches[i];//this_target.attr('id');   
                var this_2wd_parent_id = this_2wd_id+'_2wdParent';
 
                $("#"+this_2wd_id).wrap( '<div class="twowdwrapper" id="'+this_2wd_parent_id+'"></div>' );

                $('#'+this_2wd_parent_id).css('width',twoD_width);
                $('#'+this_2wd_parent_id).css('min-width',twoD_minWidth); 

                $('#'+this_2wd_parent_id).css('transform','rotateX(180deg)');
                $('#'+this_2wd_parent_id).css('overflow-x','auto');
                $('#'+this_2wd_parent_id).css('overflow-y','visible');            
                $('#'+this_2wd_id).css('transform','rotateX(180deg)');


                var this_2wd_innerWidth = $('#'+this_2wd_parent_id)[0].scrollWidth;

                var this_2wd_footer_html = '<div id="'+this_2wd_id+'_footer" class="twowdfooter" style="max-width:'+twoD_width+'px;overflow-y:hidden;">';
                this_2wd_footer_html += '<div style="width:'+(this_2wd_innerWidth)+'px;height:20px;"  id="'+this_2wd_id+'_footer_scroll">';
                this_2wd_footer_html += '</div></div>';
                $(this_2wd_footer_html).insertAfter('#'+this_2wd_parent_id);

                $('#'+this_2wd_parent_id).scroll(function () { 

                    $('#'+this_2wd_id+'_footer').scrollLeft($('#'+this_2wd_parent_id).scrollLeft());
                });
                $('#'+this_2wd_id+'_footer').scroll(function () { 

                    $('#'+this_2wd_parent_id).scrollLeft($('#'+this_2wd_id+'_footer').scrollLeft());
                });
                
            }          
            
            $('.twowdwrapper').each(function(){
                var elem_id = $(this).attr('id').replace('_2wdParent','');    
                $('#'+ $(this).attr('id')).scroll(function () { 
                    $('#'+elem_id+'_footer').scrollLeft($('#'+elem_id+'_2wdParent').scrollLeft());
                });
            });
                     
            
            $('.twowdfooter').each(function(){
                var elem_id = $(this).attr('id').replace('_footer','');   
                $('#'+ $(this).attr('id')).scroll(function () { 
                    $('#'+elem_id+'_2wdParent').scrollLeft($('#'+elem_id+'_footer').scrollLeft());
                });
            });
        
        
        var TwoWDScrollError = function(msg){
            console.log('2wdScroll Error : '+msg)
        }
    }
})(jQuery);