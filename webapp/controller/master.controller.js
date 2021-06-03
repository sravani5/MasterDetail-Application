sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"mdZMD/model/EmployeeDetails"
], function(Controller, JSONModel, EmployeeDetails) {
	"use strict";

	return Controller.extend("mdZMD.controller.master", {
		EmployeeDetails: EmployeeDetails,
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf mdZMD.view.master
		 */
		onInit: function() {
			var oEmpData = this.EmployeeDetails.EmpDetails();
			var oViewModel = new JSONModel({});
			oViewModel.setData(oEmpData);
			this.getView().setModel(oViewModel, "oViewModel");
		},
		handleDelete: function(oEvent) {
			var oList = oEvent.getSource(),
				oItem = oEvent.getParameter("listItem");
				oList.removeItem(oItem);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf mdZMD.view.master
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf mdZMD.view.master
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf mdZMD.view.master
		 */
		//	onExit: function() {
		//
		//	}

	});

});