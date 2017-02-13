class HomeController {
  constructor($state, $document, $mdDialog, GroupService) {
    "ngInject";
    Object.assign(this, {
      $state,
      $document,
      $mdDialog,
      GroupService
    });
  }

  $onInit() {
    this.GroupService.listMy().then((data) => {
      if (data.length > 0) {
        this.$state.go("group", { groupId: data[0].id });
      } else {
        this.openJoinGroupDialog();
      }
    });
  }

  openJoinGroupDialog($event) {
    this.$mdDialog.show({
      parent: this.$document.body,
      targetEvent: $event,
      template: "<join-group></join-group>"
    }).then((groupId) => {
      this.$state.go("group", { groupId });
    });
  }


}

export default HomeController;
