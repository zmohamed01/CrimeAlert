class AddDescriptionToLocations < ActiveRecord::Migration[5.2]
  def change
    add_column :locations, :description, :text
  end
end
