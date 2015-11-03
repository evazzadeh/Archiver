$.ctrl = function(key, callback, args) {
    $(document).keydown(function(e) {
        if(!args) args=[]; // IE barks when args is null
        if(e.keyCode == key.charCodeAt(0) && e.ctrlKey) {
            callback.apply(this, args);
            return false;
        }
    });        
};

function ex_new_folder()
{
    var uf = '<li id="create-new-folder" class="selected"><span class="type fa fa-folder"></span> <span class="name"><input type="text" placeholder="Untitled Folder"> <button class="btn-fa-check"><i class="fa fa-check"></i></button><button class="btn-fa-times"><i class="fa fa-times"></i></button></span> <span class="size">-</span> <span class="date">-</span></li>';
    if($('#explorer>ul li').is('#create-new-folder')) {
        $('#create-new-folder').fadeTo(100, 0.1).fadeTo(200, 1.0);
    } else {
        $(uf).hide().prependTo('#explorer>ul').fadeIn(300);
    }
    $('#explorer>ul input').select();
}

function ex_select_all()
{
    if ($('#explorer>ul').hasClass('select-all'))  {
        ex_items_remove_class('selected');
    } else {
        $('#explorer>ul li').addClass('selected');
    }

    if ($('#explorer>ul li').is('#create-new-folder')) {
        $('#create-new-folder').fadeOut().remove();
    }

    $('#explorer>ul').toggleClass('select-all');
}

function ex_cut()
{
    $('#explorer>ul li.selected').addClass('cutted');
}

function ex_copy()
{
    
}

function ex_paste()
{
    
}

function ex_rename()
{
    if ($('#explorer>ul li').hasClass('selected'))
    {
        var name = $('#explorer>ul li.selected span.name').text();
        $('#explorer>ul li.selected span.name').html('<input type="text" placeholder=""> <button class="btn-fa-check"><i class="fa fa-check"></i></button><button class="btn-fa-times"><i class="fa fa-times"></i></button>').children('input').val(name).select();
    }
}

// remove input class from all of items
function ex_items_remove_class(_className)
{
    $('#explorer>ul li').removeClass(_className);

}


function ex_item_select(_id)
{
    $('#explorer>ul li[data-row='+ _id +']').addClass('selected');
}

function ex_item_focus(_id)
{
    $('#explorer>ul li[data-row='+ _id +']').addClass('focused');
}

function ex_item_zero(_id)
{
    $('#explorer>ul li[data-row='+ _id +']').addClass('zero');
}

function ex_item_select_focus(_id)
{
    $('#explorer>ul li[data-row='+ _id +']').addClass('selected focused');
}

function ex_item_select_focus_zero(_id)
{
    $('#explorer>ul li[data-row='+ _id +']').addClass('selected focused zero');
}


function ex_items_select_until(_id)
{
    var zero = $('#explorer>ul li.zero').attr("data-row");
    console.log(zero);
    var start = zero < _id ? zero : _id; 
    start = parseInt(start);
    var end   = zero > _id ? zero : _id; 
    end = parseInt(end);

    for (var i = start; i <= end; i++)
    {
        console.log(i);
        $('#explorer>ul li[data-row='+ i +']').addClass('selected');
    }
}

function event_corridor(_ctrl, _shift, _self, _key)
{
    _self = $(_self);
    var cid    = parseInt(_self.attr('data-row'));
    var lastid = parseInt($('#explorer>ul li:last').attr('data-row'));

    var ctrl   = _ctrl  ? 'ctrl' : '';
    var shift  = _shift ? 'shift' : '';
    var mytxt  = String(_key) + ctrl + shift;

    // console.log(_key);
    // console.log(mytxt);

    switch(mytxt)
    {
        case '32':              // space
        case '32shift':         // space + shift
            _self.addClass('selected');

        break;

        case '32ctrl':          // space + ctrl
        case '32ctrlshift':     // space + ctrl + shift
            _self.toggleClass('selected');

        break;
        

        case '37':              // left
            console.log('left');
        break;


        case '38':              // up
            next = cid > 0 ? cid - 1 : 0;
            ex_items_remove_class('selected focused zero');
            ex_item_select_focus_zero(next);
        break;

       case '38ctrl':           // up + ctrl
            next = cid > 0 ? cid - 1 : 0;
            ex_items_remove_class('focused');
            ex_item_focus(next);
        break;

       case '38shift':          // up + shift
            next = cid > 0 ? cid - 1 : 0;
            ex_items_remove_class('focused selected');
            ex_items_select_until(next);
            ex_item_focus(next);
        break;

       case '38ctrlshift':      // up + ctrl + shift
            next = cid > 0 ? cid - 1 : 0;
            ex_items_remove_class('focused zero');
            ex_item_select_focus_zero(next);
        break;


        case '39':              // right
            console.log('right');
        break;


        case '40':              // down
            next = cid>= lastid ? lastid : cid + 1;
            ex_items_remove_class('selected focused zero');
            ex_item_select_focus_zero(next);
        break;

       case '40ctrl':           // down + ctrl
            next = cid>= lastid ? lastid : cid + 1;
            ex_items_remove_class('focused');
            ex_item_focus(next);
        break;

       case '40shift':          // down + shift
            next = cid>= lastid ? lastid : cid + 1;
            ex_items_remove_class('focused selected');
            ex_items_select_until(next);
            ex_item_focus(next);
        break;

       case '40ctrlshift':     // down + shift
            next = cid>= lastid ? lastid : cid + 1;
            ex_items_remove_class('focused zero');
            ex_item_select_focus_zero(next);
        break;




        // ---------------------------------------------------------------------- shortcut
        case '65ctrl':          // a + ctrl
            ex_select_all();
        break;

        case '67ctrl':          // c + ctrl
            ex_copy();
        break;

        case '78ctrl':          // n + ctrl
            ex_new_folder();
        break;

        case '86ctrl':          // v + ctrl
            ex_paste();
        break;

        case '88ctrl':          // x + ctrl
            ex_cut();
        break;


        case '113':             // f2
            ex_rename();
        break;



        // ---------------------------------------------------------------------- mouse
        case 'click':           // click
            ex_items_remove_class('selected focused zero');
            _self.addClass('selected focused zero');
        break;


        case 'clickctrl':       // click + ctrl
            ex_items_remove_class('focused zero');
            _self.toggleClass('selected focused zero');
        break;


        case 'clickshift':      // click + shift
            ex_items_remove_class('selected focused');
            ex_items_select_until(cid);
            ex_item_focus(cid);
        break;


        case 'clickctrlshift':  // click + ctrl + shift
            ex_items_remove_class('focused');
            ex_items_select_until(cid);
            ex_item_focus(cid);
        break;



        default:
        return; // exit this handler for other keys
    }


    if(_key == 'click')
    {
        $('#explorer>ul').removeClass('select-all');
    }
}



$(document).ready(function()
{
    // call from menu
    $('#more-selectall').click(function() { ex_select_all(); });
    $('#newfolder').click(function() { ex_new_folder(); });
    $('#more-rename').click(function() { ex_rename(); });
    $('#more-move').click(function() { ex_cut(); });


    $('#explorer>ul li').click(function(e) { event_corridor(e.ctrlKey, e.shiftKey, e.currentTarget, 'click'); });
    $(document).keydown(function(e) { event_corridor(e.ctrlKey, e.shiftKey, $('#explorer>ul li.focused')[0], e.which ); });
});
