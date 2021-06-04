sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"mdZMD/model/EmployeeDetails",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, JSONModel, EmployeeDetails, Filter, FilterOperator) {
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
			this._oListFilterState = {
					aFilter : [],
					aSearch : []
				};
			sap.ui.core.UIComponent.getRouterFor(this).getRoute("master").attachPatternMatched(this._onMasterMatched, this);
			// var oRouter = this.getOwnerComponent().getRouter();
		},
		handleDelete: function(oEvent) {
			var oList = oEvent.getSource(),
				oItem = oEvent.getParameter("listItem");
			oList.removeItem(oItem);
		},
		handleSelectChange: function(oEvent) {
			var type = oEvent.getParameter("selectedItem").getKey();
			this.byId("list").getItems().forEach(function(item) {
				item.setType(type);
			});
		},
		onNavListItemPress: function(oEvnt) {
			// var oList = oEvnt.getSource(),
			var oSelObj = oEvnt.getSource().getBindingContext("oViewModel").getObject();
			sap.ui.core.UIComponent.getRouterFor(this).navTo("detail", {
				objectId: oSelObj.EmpId,
				sPath: oEvnt.getSource().getBindingContext("oViewModel").getPath().replace("/", "")
			});

		},
		onUpdateListFinished: function(oEvnt) {
			var firstItem = this.getView().byId("list").getItems()[0],
				oSelObj = firstItem.getBindingContext("oViewModel").getObject();
			this.getView().byId("list").setSelectedItem(firstItem, true);
			sap.ui.core.UIComponent.getRouterFor(this).navTo("detail", {
				objectId: oSelObj.EmpId,
				sPath: firstItem.getBindingContext("oViewModel").getPath().replace("/", "")
			});
			// this.onNavListItemPress(firstItem);
		},
		_onMasterMatched: function() {

		},
		onSearch: function(oEvent) {
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				this._oListFilterState.aSearch = [new Filter("EmpId", FilterOperator.Contains, sQuery)];
			} else {
				this._oListFilterState.aSearch = [];
			}
			this._applyFilterSearch();
		},

		_applyFilterSearch: function() {
			var aFilters = this._oListFilterState.aSearch.concat(this._oListFilterState.aFilter);
			this.getView().byId("list").getBinding("items").filter(aFilters, "Application");
		}

		// _applyFilterSearch : fuunction(oEvnt) {
		// 	var aFilters = this._oListFilterState.aSearch.concat(this._oListFilterState.aFilter),
		// 			oViewModel = this.getModel("masterView");
		// 		this._oList.getBinding("items").filter(aFilters, "Application");
		// }

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