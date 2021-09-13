import * as discord from "discord.js-light";

export class CodersBot {
  private readonly client = null as discord.Client;

  constructor(){
    this.client = new discord.Client({
      cacheGuilds: true,
      cacheChannels: true,
      cacheOverwrites: false,
      cacheRoles: true,
      cacheEmojis: false,
      cachePresences: false,
      ws: {
        intents: [
          "GUILDS",
          "GUILD_MEMBERS",
          "GUILD_MESSAGES",
        ]
      }
    }).on("ready", () => {
      console.log("Discord Bot is ready now");
    }).on("guildMemberAdd", async(member) => {
      // ロール取得
      const role = await member.guild.roles.fetch(process.env.ROLE_ID);
      // ロール追加
      await member.roles.add(role);
      // チャンネル取得
      const channel = await member.guild.channels.fetch(process.env.CHANNEL_ID) as discord.TextChannel;
      // ウェルカムメッセージ送信
      await channel.send(
        "<@" + member.id + "> さん、初めまして。\r\n" +
        "ロールのほう追加いたしましたので、サーバールールの方確認していただければ幸いです。"
      );
    });
  }

  async Run(token:string){
    if(this.client){
      await this.client.login(token);
    }else{
      throw new Error("Client was not initialized");
    }
  }
}