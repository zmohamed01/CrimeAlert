class AddLatitudeToReports < ActiveRecord::Migration[5.2]
  def change
    add_column :reports, :latitude, :float
  end
end
