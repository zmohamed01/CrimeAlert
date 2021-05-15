class PlacesController < ApplicationController
  before_action :set_place, only: %i[ show ]

  # GET /places or /places.json
  def index
    @places = Place.where(['name LIKE ?', "%#{params[:search]}%"])
    @crimes = Location.all
  end

  # GET /places/1 or /places/1.json
  def show
  end

  # GET /places/new
  def new
    @place = Place.new
  end

  # POST /places or /places.json
  def create
    @place = Place.new(place_params)

    respond_to do |format|
      if @place.save
        format.html { redirect_to @place, notice: "Place was successfully created." }
        format.json { render :show, status: :created, location: @place }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @place.errors, status: :unprocessable_entity }
      end
    end
  end



  private
    # Use callbacks to share common setup or constraints between actions.
    def set_place
      @place = Place.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def place_params
      params.require(:place).permit(:name, :latitude, :longitude)
    end
end
