class GamesController < ApplicationController

  def index

    @fastest_times = Game.fastest_times(params[:image_id])

    respond_to do |format|
      format.json { render :json => @fastest_times, :status => 200 }
    end

  end

  def new

    @game = Game.new

  end

  def create

    @game = Game.new
    @game.create_player(:name => 'Player')
    @game.start_time = Time.now
    @game.image = Image.first

    if @game.save
      redirect_to @game
    else
      render :new
    end

  end

  def show

    @game = Game.find(params[:id])

    game_data = @game.to_json(:include => [:characters, :tags])

    respond_to do |format|
      format.html { render :show }
      format.json { render :json => game_data, :status => 200 }
    end

  end

  def update

    @game = Game.find(params[:id])
    check_tags = (@game.tags.count == @game.characters.count)

    if check_tags && @game.update(:end_time => Time.now)
      game_data = @game.to_json(:include => [:characters, :tags])

      respond_to do |format|
        format.json { render :json => game_data, :status => 200 }
      end

    else
      respond_to do |format|
        format.json { render :nothing => true, :status => :unprocessable_entity }
      end
    end

  end
  
end
