Polymer('cp-dropdown', {

	_highlightedIndex: -1,

	value: "",

	onKeyDown: function onKeyDown (event) {
		switch (event.keyCode) {
			// UP
			case 38:
				this.highlightedIndex -= 1;
				break;
			// DOWN
			case 40:
				this.highlightedIndex += 1;
				break;
			// ENTER
			case 13:
				this.executeHighlightedItem();
				break;
			default: 
				this.highlightedIndex = -1;
		}
	},

	valueChanged: function (oldValue, newValue) {
		var self = this;
		this.items = this.ctrl.getQueryItems(newValue, this.items);
	},

	get highlightedIndex () {
		return this._highlightedIndex;
	},

	set highlightedIndex (val) {

		// we need to take into account, that the first "item" is the template
		// and ignored it

		if (val < -1)
			val = this.$items.length - 2;
		else if (val >= this.$items.length - 1)
			val = -1;

		if(this._highlightedIndex === val)
			return;

		var prevItem = this.$items[this._highlightedIndex+1];
		if(prevItem)
			prevItem.classList.remove("dropdown-selected");

		this._highlightedIndex = val;

		var currItem = this.$items[val+1];
		if(currItem)
			currItem.classList.add("dropdown-selected");
	},

	_highlightedIndexChanged: function (oldValue, newValue) {

	},

	executeHighlightedItem: function () {
		if(this.ctrl && this.ctrl.onExecution) {
			this.ctrl.onExecution(this.highlightedIndex !== -1 ? this.results[this.highlightedIndex] : null, this.highlightedIndex, this.value);
		}
	},

	ready: function() {
		this.items = [];
		this.ctrl = null;
		this.$items = this.$.dropdownList.children;

	},

	enteredView: function() {
    this.template = this.querySelector('template');
  },

	templateChanged: function() {
		
		this.template.bindingDelegate = new PolymerExpressions();
		this.template.setAttribute('repeat', '{{ item in items }}');
		this.template.model = this;

	},

});
