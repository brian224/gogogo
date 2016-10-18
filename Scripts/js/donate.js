(function (window, document, jQuery, undefined) {
    'use strict';

    var donate = new page();

    function page() {
        this._tabButton = '.jq-tabButton',
        this._tab       = '.jq-tab';
    }

    jQuery(donate._tabButton).on('click' , function(e){
        e.preventDefault();
        var $self  = jQuery(this),
            hash   = jQuery(this).data('hash'),
            tab    = jQuery(this).data('tab');
        var _regex = /is\-\S+/.exec(jQuery(donate._tab)[0].className)[0];

        if( !$self.parent().hasClass(hash) ){
            $self.parent().siblings().removeClass(hash);
            $self.parent().addClass(hash);
            jQuery(donate._tab).removeClass(_regex);
            jQuery(donate._tab).addClass(tab);
        }
    });

}(window, document, $));