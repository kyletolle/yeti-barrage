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

  # GET /yetis/1
  # GET /yetis/1.json
  def show
    @yeti = Yeti.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @yeti }
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
      format.json { render json: @yeti }
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
        format.html { redirect_to @yeti, notice: 'Yeti was successfully created.' }
        format.json { render json: @yeti, status: :created, location: @yeti }
      else
        format.html { render action: "new" }
        format.json { render json: @yeti.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /yetis/1
  # PUT /yetis/1.json
  def update
    @yeti = Yeti.find(params[:id])

    respond_to do |format|
      if @yeti.update_attributes(params[:yeti])
        format.html { redirect_to @yeti, notice: 'Yeti was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @yeti.errors, status: :unprocessable_entity }
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
      format.json { head :no_content }
    end
  end
  
  private
    def google_maps_api_key
      return ENV["google_maps_api_key"].strip
    end
end
