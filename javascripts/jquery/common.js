function clearGrid(gridid) {
	$(gridid).jqGrid("clearGridData").trigger('reloadGrid');
}

function doresult(data) {
	if (data != null && data.header != null) {
		if (!isEmpty(data.header.infomessage))
			alert(data.header.infomessage);
		if (data.header.infocode == 1) {
			return data.body.data;
		} else if (data.header.infocode == 0) {
			if (isEmpty(data.header.infomessage))
				alert("The return code is not initial");
		} else if (data.header.infocode == -1) {
			alert(data.header.infomeassage);
		}
	} else {
		alert("Nothing replay from web server.");
	}
}

function isEmpty(object) {
	return object == null || object == "" || object == undefined;
}

var Me;
$(function() {
	Me = new function() {
		var dialogid = 'dialogdiv';
		var dialogdiv = $('#' + dialogid);
		if (dialogdiv != undefined) {
			dialogid = dialogid + '1';
		}
		dialogdiv = document.createElement("div");

		dialogdiv.id = dialogid;
		document.body.appendChild(dialogdiv);
		var laid = dialogid + '_label';
		$('#' + dialogid).dialog({
			autoOpen : false,
			height : 200,
			width : 300,
			modal : true,
			show : "clip",
			hide : "clip",
			close : function() {
			}
		});
		$('#' + dialogid).html("<p id='" + laid + "' class='dialog_globle'></p>");
		this.div = dialogdiv;
		this.dialogid = dialogid;
	}
	Me.value = false;
	Me.d = function() {
		return $('#' + Me.dialogid);
	}

	Me.setDialogOption = function(key, value) {
		$('#' + Me.dialogid).dialog('option', key, value);
	};

	Me.open = function() {
		Me.d().dialog('open');
	}
	Me.close = function() {
		Me.d().dialog('close');
	}

	Me.c = function(m) {
		$('#' + Me.dialogid + "_label").html(m);
	}

	Me.e = function(message, modal) {
		Me.setDialogOption('title', 'Error');
		Me.setDialogOption('buttons', {
			'OK' : function() {
				Me.close();
			}
		});
		Me.setDialogOption('modal', modal);
		Me.c(message);
		Me.open();
	}

	Me.w = function(message,modal) {
		Me.setDialogOption('title', 'Warning');
		Me.setDialogOption('buttons', {
			'OK' : function() {
				Me.close();
			}
		});
		Me.setDialogOption('modal', modal);
		Me.c(message);
		Me.open();
	}
	Me.s = function(message,modal) {
		Me.setDialogOption('title', 'Information');
		Me.setDialogOption('buttons', {
			'OK' : function() {
				Me.close();
			}
		});
		Me.setDialogOption('modal', modal);
		Me.c(message);
		Me.open();
	}

	Me.yesorno = function(message, yesfunction, nofunction, title, modal) {
		if (Me.div) {
			Me.setDialogOption('title', title == undefined ? 'Yes Or Not'
					: title);
			Me.setDialogOption('buttons', {
				'Yes' : function() {
					if (yesfunction != undefined)
						yesfunction();
					Me.close();
				},
				'No' : function() {
					if (nofunction != undefined)
						nofunction();
					Me.close();
				}
			});
			Me.c(message);
			Me.setDialogOption('modal', modal);
			Me.open();
		}
	}
})

function Http(requesturl, paramsobject, successhandler, errorhandler) {
}

Http.prototype.send = function(requesturl, paramsobject, successhandler,
		errorhandler) {
	$.ajax({
		url : requesturl,
		type : 'POST',
		data : {
			data : JSON.stringify(paramsobject)
		},
		success : successhandler,
		error : errorhandler == undefined ? this.defaulterrorhandler
				: errorhandler
	});
};

Http.prototype.defaulterrorhandler = function(evt) {
	alert(evt);
}

Http.prototype.post = function(requesturl, paramsobject, successhandler,
		errorhandler) {
	var postparam = {
		data : JSON.stringify(paramsobject)
	};
	$.ajax({
		url : requesturl,
		type : 'POST',
		data : postparam,
		success : function(data) {
			var receivedata = doresult(data);
			if (receivedata != null && receivedata != "")
				successhandler(receivedata);
		},
		error : errorhandler == undefined ? this.defaulterrorhandler
				: errorhandler
	});
};

Http.prototype.normalpost = function(requesturl, paramsobject, successhandler,
		errorhandler) {
	$.ajax({
		url : requesturl,
		type : 'POST',
		data : paramsobject,
		success : function(data) {
			var receivedata = doresult(data);
			if (receivedata != null && receivedata != "")
				successhandler(receivedata);
		},
		error : errorhandler == undefined ? this.defaulterrorhandler
				: errorhandler
	});
};
