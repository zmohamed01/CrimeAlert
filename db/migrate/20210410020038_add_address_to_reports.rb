class AddAddressToReports < ActiveRecord::Migration[5.2]
  def change
    add_column :reports, :address, :text
  end
end
