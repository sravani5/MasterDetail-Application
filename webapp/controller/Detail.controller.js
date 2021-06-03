sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"mdZMD/model/EmployeeDetails",
	"sap/ui/model/json/JSONModel"
], function(Controller, EmployeeDetails,JSONModel) {
	"use strict";

	return Controller.extend("mdZMD.controller.Detail", {
		EmployeeDetails: EmployeeDetails,
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf mdZMD.view.Detail
			 */
		onInit: function() {
			var oEmpDet = this.EmployeeDetails.EmpDetails();
			var oEModel = new JSONModel({});
			oEModel.setData(oEmpDet);
			this.getView().setModel(oEModel,"oEModel");
			sap.ui.core.UIComponent.getRouterFor(this).getRoute("detail").attachPatternMatched(this._onDetailMatched, this);
		},
		_onDetailMatched: function(oEvt) {
				var sPath = oEvt.getParameter("arguments").sPath;
				this.getView().byId("emp").bindElement({ path: "/" + sPath, model: "oEModel" });
				
			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf mdZMD.view.Detail
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf mdZMD.view.Detail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf mdZMD.view.Detail
		 */
		//	onExit: function() {
		//
		//	}

	});

});