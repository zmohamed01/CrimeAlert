class AddAdminToModels < ActiveRecord::Migration[5.2]
  def change
    add_column :models, :admin, :boolean, default: false
  end
end
