class YetisController < ApplicationController
  # GET /yetis
  # GET /yetis.json
  def index
    @yetis = Yeti.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @yetis }
    end
  end

  # GET /yetis/map
  def map
    @google_maps_api_key = google_maps_api_key
  end

  # GET /yetis/new
  # GET /yetis/new.json
  def new
    @yeti = Yeti.new

    respond_to do |format|
      format.html # new.html.erb
      format.json # new.json.erb
      end
  end

  # GET /yetis/1/edit
  def edit
    @yeti = Yeti.find(params[:id])
  end

  # POST /yetis
  # POST /yetis.json
  def create
    @yeti = Yeti.new(params[:yeti])

    respond_to do |format|
      if @yeti.save
        format.html { redirect_to yetis_map_path }
      else
        format.html { render action: "new" }
      end
    end
  end

  # PUT /yetis/1
  # PUT /yetis/1.json
  def update
    @yeti = Yeti.find(params[:id])

    respond_to do |format|
      if @yeti.update_attributes(params[:yeti])
        format.html { redirect_to yetis_url }
      else
        format.html { render action: "edit" }
      end
    end
  end

  # DELETE /yetis/1
  # DELETE /yetis/1.json
  def destroy
    @yeti = Yeti.find(params[:id])
    @yeti.destroy

    respond_to do |format|
      format.html { redirect_to yetis_url }
    end
  end
  
  private
    def google_maps_api_key
      return ENV["google_maps_api_key"].strip
    end
end
