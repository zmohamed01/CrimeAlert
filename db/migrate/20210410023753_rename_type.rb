class RenameType < ActiveRecord::Migration[5.2]
  def change
	rename_column :locations, :type, :typec
  end
end
