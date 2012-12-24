class UsersController < ApplicationController
  def index
    @users = User.limit(2)

    respond_to do |format|
      format.json { render :json => { :users => @users , :total => User.all.count } }
    end
  end

  def create
    @user = User.new(params[:user])

    respond_to do |format|
      if @user.save
        format.json { render :json => { :success => true, :users => [@user] } }
      end
    end
  end

  def update
    @user = User.find(params[:id])

    respond_to do |format|
      if @user.update_attributes(params[:user])
        format.json { render :json => { :success => true, :users => [@user] } }
      end
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy

    respond_to do |format|
      format.json { render :json => { :success => true } }
    end
  end
end
